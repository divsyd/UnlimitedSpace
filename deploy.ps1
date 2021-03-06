
# ----------------------
# KUDU Deployment Script
# Version: 1.0.16
# ----------------------

# Helpers
# -------

function exitWithMessageOnError($1) {
    if ($? -eq $false) {
        echo "An error has occurred during web site deployment."
        echo $1
        exit 1
    }
}

# Prerequisites
# -------------

# Verify node.js installed
where.exe node 2> $null > $null
exitWithMessageOnError "Missing node.js executable, please install node.js, if already installed make sure it can be reached from current environment."

# Setup
# -----

$SCRIPT_DIR = $PSScriptRoot
$ARTIFACTS = "$SCRIPT_DIR\..\artifacts"

$KUDU_SYNC_CMD = $env:KUDU_SYNC_CMD

$DEPLOYMENT_SOURCE = $env:DEPLOYMENT_SOURCE
$DEPLOYMENT_TARGET = $env:DEPLOYMENT_TARGET

$NEXT_MANIFEST_PATH = $env:NEXT_MANIFEST_PATH
$PREVIOUS_MANIFEST_PATH = $env:PREVIOUS_MANIFEST_PATH

if ($DEPLOYMENT_SOURCE -eq $null) {
    $DEPLOYMENT_SOURCE = $SCRIPT_DIR
}

if ($DEPLOYMENT_TARGET -eq $null) {
    $DEPLOYMENT_TARGET = "$ARTIFACTS\wwwroot"
}

if ($NEXT_MANIFEST_PATH -eq $null) {
    $NEXT_MANIFEST_PATH = "$ARTIFACTS\manifest"

    if ($PREVIOUS_MANIFEST_PATH -eq $null) {
        $PREVIOUS_MANIFEST_PATH = $NEXT_MANIFEST_PATH
    }
}

if ($KUDU_SYNC_CMD -eq $null) {
    # Install kudu sync
    echo "Installing Kudu Sync"
    npm install kudusync -g --silent
    exitWithMessageOnError "npm failed"

    # Locally just running "kuduSync" would also work
    $KUDU_SYNC_CMD = "$env:APPDATA\npm\kuduSync.cmd"
}

# Node Helpers
# ------------

$NODE_EXE = "node"
$NPM_CMD = "npm"

function selectNodeVersion() {
    if ($env:KUDU_SELECT_NODE_VERSION_CMD -ne $null) {
        # The following are done only on Windows Azure Websites environment
        $SELECT_NODE_VERSION = "$env:KUDU_SELECT_NODE_VERSION_CMD `"$DEPLOYMENT_SOURCE`" `"$DEPLOYMENT_TARGET`" `"$DEPLOYMENT_TEMP`""
        try {
            iex $SELECT_NODE_VERSION
        } catch {
            exitWithMessageOnError "select node version failed"
        }

        if (Test-Path "$DEPLOYMENT_TEMP\__nodeVersion.tmp") {
            $NODE_EXE = cat "$DEPLOYMENT_TEMP\__nodeVersion.tmp"
            exitWithMessageOnError "getting node version failed"
        }

        if (Test-Path "$DEPLOYMENT_TEMP\__npmVersion.tmp") {
            $NPM_JS_PATH = cat "$DEPLOYMENT_TEMP\__npmVersion.tmp"
            exitWithMessageOnError "getting npm version failed"
        }

        if ($NODE_EXE -eq $null) {
            $NODE_EXE = "node"
        }
        $NPM_CMD = "`"$NODE_EXE`" `"$NPM_JS_PATH`""
    }
}

##################################################################################################################################
# Deployment
# ----------

echo "Handling node.js deployment."

# 1. KuduSync
if ($env:IN_PLACE_DEPLOYMENT -ne "1") {
    & $KUDU_SYNC_CMD -v 50 -f "$DEPLOYMENT_SOURCE" -t "$DEPLOYMENT_TARGET" -n "$NEXT_MANIFEST_PATH" -p "$PREVIOUS_MANIFEST_PATH" -i ".git;.hg;.deployment;deploy.ps1"
    exitWithMessageOnError "Kudu Sync failed"
}

# 2. Select node version
selectNodeVersion

# 3. Sleeping to stop quota limit issues
if ($env:delaydeploy) {
    Start-Sleep -Seconds 300
}

# 4. Install npm packages
if (Test-Path "$DEPLOYMENT_TARGET\package.json") {
    pushd "$DEPLOYMENT_TARGET"
    try {
        $env:path = $env:path.replace("D:\Program Files (x86)\MSBuild\14.0\Bin", "D:\Program Files (x86)\MSBuild-15.3.409.57025\MSBuild\15.0\Bin")
        iex "$NPM_CMD config set msvs_version 2017"

        iex "$NPM_CMD install --production"
    } catch {
        exitWithMessageOnError "npm failed"
    }
    popd
}

# 5. Sleeping to stop quota limit issues
if ($env:delaydeploy) {
    Start-Sleep -Seconds 300
}


# 6. Angular Prod Build
if (Test-Path "$DEPLOYMENT_TARGET\angular.json") {
    pushd "$DEPLOYMENT_TARGET"
    try {
        iex ".\node_modules\.bin\ng build --progress false --prod"
    } catch {
        exitWithMessageOnError "ng build failed"
    }
    popd
}

##################################################################################################################################
echo "Finished successfully."
