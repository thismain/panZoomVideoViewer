let tabs = new Set();

function inject(tabId){
chrome.tabs.executeScript(tabId, { file: "vid5.js", runAt: "document_end" });
}

function onHeadersReceived(details){
if(!tabs.has(details.tabId)){
details.responseHeaders.some(function(header){
if(header.name.toLowerCase() === "content-type" && /^video\/(mp4|webm|3gp|ogg|wmv|flv|avi|mkv|vob|ogv|gifv|mng|mov|qt|yuv|rm|asf|amv|m4p|m4v|mpg|mpeg|mp2|mpe|mpv|m2v|m4v|svi|3g2|mxf|roq|nsv|f4v|f4p|f4a|f4b|rmvb|mts|m2ts|ts|drc)$/.test(header.value)){
tabs.add(details.tabId); 
return true;
} //end header name
}); //end details response headers
} //end !tabs
}//end on headers received

function onTabUpdated(_, changeInfo, tab){
if (/^file:\/\/\/.+\.(mp4|webm|3gp|ogg|wmv|flv|avi|mkv|vob|ogv|gifv|mng|mov|qt|yuv|rm|asf|amv|m4p|m4v|mpg|mpeg|mp2|mpe|mpv|m2v|m4v|svi|3g2|mxf|roq|nsv|f4v|f4p|f4a|f4b|rmvb|mts|m2ts|ts|drc)$/.test(tab.url) && changeInfo.status === "loading" || tabs.has(tab.id)){
inject(tab.id);
tabs.delete(tab.id);
} //end if loading
}//end on tab updated

chrome.webRequest.onHeadersReceived.addListener(onHeadersReceived, { types: [ "main_frame" ], urls: [ "http://*/*", "https://*/*" ] }, [ "responseHeaders" ]);

chrome.tabs.onUpdated.addListener(onTabUpdated);




