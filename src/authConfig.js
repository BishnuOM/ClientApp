/*
 * Copyright (c) Microsoft Corporation. All rights reserved.
 * Licensed under the MIT License.
 */


/**
 * Configuration object to be passed to MSAL instance on creation. 
 * For a full list of MSAL.js configuration parameters, visit:
 * https://github.com/AzureAD/microsoft-authentication-library-for-js/blob/dev/lib/msal-browser/docs/configuration.md 
 */
export const msalConfig = {
    clientId: "6d5e92a7-28dd-4894-95d9-8b0f1112795a",
    authority: "https://login.microsoftonline.com/common",
    client_secret:"raq8Q~q_BVmpnXOof5WPhJ1GN1PWYWP-KvAgvc0p",
    scopes: ["User.Read"]
    
};

export const graphConfig = {
    graphMeEndpoint: "https://graph.microsoft.com/v1.0/me"
};
export const graphImageConfig = {
    graphMeEndpoint: "https://graph.microsoft.com/v1.0/me/photo/$value"
};