document.write('<link rel="stylesheet" href="https://github.githubassets.com/assets/gist-embed-31007ea0d3bd9f80540adfbc55afc7bd.css">')
document.write('<div id=\"gist100640680\" class=\"gist\">\n    <div class=\"gist-file\">\n      <div class=\"gist-data\">\n        <div class=\"js-gist-file-update-container js-task-list-container file-box\">\n  <div id=\"file-dbquery-js\" class=\"file\">\n    \n\n  <div itemprop=\"text\" class=\"Box-body p-0 blob-wrapper data type-javascript \">\n      \n<table class=\"highlight tab-size js-file-line-container\" data-tab-size=\"8\" data-paste-markdown-skip>\n      <tr>\n        <td id=\"file-dbquery-js-L1\" class=\"blob-num js-line-number\" data-line-number=\"1\"><\/td>\n        <td id=\"file-dbquery-js-LC1\" class=\"blob-code blob-code-inner js-file-line\"><span class=pl-c>//db/dev/dbQuery.js<\/span><\/td>\n      <\/tr>\n      <tr>\n        <td id=\"file-dbquery-js-L2\" class=\"blob-num js-line-number\" data-line-number=\"2\"><\/td>\n        <td id=\"file-dbquery-js-LC2\" class=\"blob-code blob-code-inner js-file-line\">\n<\/td>\n      <\/tr>\n      <tr>\n        <td id=\"file-dbquery-js-L3\" class=\"blob-num js-line-number\" data-line-number=\"3\"><\/td>\n        <td id=\"file-dbquery-js-LC3\" class=\"blob-code blob-code-inner js-file-line\"><span class=pl-k>import<\/span> <span class=pl-s1>pool<\/span> <span class=pl-k>from<\/span> <span class=pl-s>&#39;./pool&#39;<\/span><span class=pl-kos>;<\/span><\/td>\n      <\/tr>\n      <tr>\n        <td id=\"file-dbquery-js-L4\" class=\"blob-num js-line-number\" data-line-number=\"4\"><\/td>\n        <td id=\"file-dbquery-js-LC4\" class=\"blob-code blob-code-inner js-file-line\">\n<\/td>\n      <\/tr>\n      <tr>\n        <td id=\"file-dbquery-js-L5\" class=\"blob-num js-line-number\" data-line-number=\"5\"><\/td>\n        <td id=\"file-dbquery-js-LC5\" class=\"blob-code blob-code-inner js-file-line\"><span class=pl-k>export<\/span> <span class=pl-k>default<\/span> <span class=pl-kos>{<\/span><\/td>\n      <\/tr>\n      <tr>\n        <td id=\"file-dbquery-js-L6\" class=\"blob-num js-line-number\" data-line-number=\"6\"><\/td>\n        <td id=\"file-dbquery-js-LC6\" class=\"blob-code blob-code-inner js-file-line\">  <span class=pl-c>/**<\/span><\/td>\n      <\/tr>\n      <tr>\n        <td id=\"file-dbquery-js-L7\" class=\"blob-num js-line-number\" data-line-number=\"7\"><\/td>\n        <td id=\"file-dbquery-js-LC7\" class=\"blob-code blob-code-inner js-file-line\"><span class=pl-c>   * DB Query<\/span><\/td>\n      <\/tr>\n      <tr>\n        <td id=\"file-dbquery-js-L8\" class=\"blob-num js-line-number\" data-line-number=\"8\"><\/td>\n        <td id=\"file-dbquery-js-LC8\" class=\"blob-code blob-code-inner js-file-line\"><span class=pl-c>   * <span class=pl-k>@param<\/span> {<span class=pl-smi>object<\/span>} req<\/span><\/td>\n      <\/tr>\n      <tr>\n        <td id=\"file-dbquery-js-L9\" class=\"blob-num js-line-number\" data-line-number=\"9\"><\/td>\n        <td id=\"file-dbquery-js-LC9\" class=\"blob-code blob-code-inner js-file-line\"><span class=pl-c>   * <span class=pl-k>@param<\/span> {<span class=pl-smi>object<\/span>} res<\/span><\/td>\n      <\/tr>\n      <tr>\n        <td id=\"file-dbquery-js-L10\" class=\"blob-num js-line-number\" data-line-number=\"10\"><\/td>\n        <td id=\"file-dbquery-js-LC10\" class=\"blob-code blob-code-inner js-file-line\"><span class=pl-c>   * <span class=pl-k>@returns<\/span> {<span class=pl-smi>object<\/span>} object<\/span><\/td>\n      <\/tr>\n      <tr>\n        <td id=\"file-dbquery-js-L11\" class=\"blob-num js-line-number\" data-line-number=\"11\"><\/td>\n        <td id=\"file-dbquery-js-LC11\" class=\"blob-code blob-code-inner js-file-line\"><span class=pl-c>   */<\/span><\/td>\n      <\/tr>\n      <tr>\n        <td id=\"file-dbquery-js-L12\" class=\"blob-num js-line-number\" data-line-number=\"12\"><\/td>\n        <td id=\"file-dbquery-js-LC12\" class=\"blob-code blob-code-inner js-file-line\">  <span class=pl-en>query<\/span><span class=pl-kos>(<\/span><span class=pl-s1>quertText<\/span><span class=pl-kos>,<\/span> <span class=pl-s1>params<\/span><span class=pl-kos>)<\/span> <span class=pl-kos>{<\/span><\/td>\n      <\/tr>\n      <tr>\n        <td id=\"file-dbquery-js-L13\" class=\"blob-num js-line-number\" data-line-number=\"13\"><\/td>\n        <td id=\"file-dbquery-js-LC13\" class=\"blob-code blob-code-inner js-file-line\">    <span class=pl-k>return<\/span> <span class=pl-k>new<\/span> <span class=pl-v>Promise<\/span><span class=pl-kos>(<\/span><span class=pl-kos>(<\/span><span class=pl-s1>resolve<\/span><span class=pl-kos>,<\/span> <span class=pl-s1>reject<\/span><span class=pl-kos>)<\/span> <span class=pl-c1>=&gt;<\/span> <span class=pl-kos>{<\/span><\/td>\n      <\/tr>\n      <tr>\n        <td id=\"file-dbquery-js-L14\" class=\"blob-num js-line-number\" data-line-number=\"14\"><\/td>\n        <td id=\"file-dbquery-js-LC14\" class=\"blob-code blob-code-inner js-file-line\">      <span class=pl-s1>pool<\/span><span class=pl-kos>.<\/span><span class=pl-en>query<\/span><span class=pl-kos>(<\/span><span class=pl-s1>quertText<\/span><span class=pl-kos>,<\/span> <span class=pl-s1>params<\/span><span class=pl-kos>)<\/span><\/td>\n      <\/tr>\n      <tr>\n        <td id=\"file-dbquery-js-L15\" class=\"blob-num js-line-number\" data-line-number=\"15\"><\/td>\n        <td id=\"file-dbquery-js-LC15\" class=\"blob-code blob-code-inner js-file-line\">        <span class=pl-kos>.<\/span><span class=pl-en>then<\/span><span class=pl-kos>(<\/span><span class=pl-kos>(<\/span><span class=pl-s1>res<\/span><span class=pl-kos>)<\/span> <span class=pl-c1>=&gt;<\/span> <span class=pl-kos>{<\/span><\/td>\n      <\/tr>\n      <tr>\n        <td id=\"file-dbquery-js-L16\" class=\"blob-num js-line-number\" data-line-number=\"16\"><\/td>\n        <td id=\"file-dbquery-js-LC16\" class=\"blob-code blob-code-inner js-file-line\">          <span class=pl-s1>resolve<\/span><span class=pl-kos>(<\/span><span class=pl-s1>res<\/span><span class=pl-kos>)<\/span><span class=pl-kos>;<\/span><\/td>\n      <\/tr>\n      <tr>\n        <td id=\"file-dbquery-js-L17\" class=\"blob-num js-line-number\" data-line-number=\"17\"><\/td>\n        <td id=\"file-dbquery-js-LC17\" class=\"blob-code blob-code-inner js-file-line\">        <span class=pl-kos>}<\/span><span class=pl-kos>)<\/span><\/td>\n      <\/tr>\n      <tr>\n        <td id=\"file-dbquery-js-L18\" class=\"blob-num js-line-number\" data-line-number=\"18\"><\/td>\n        <td id=\"file-dbquery-js-LC18\" class=\"blob-code blob-code-inner js-file-line\">        <span class=pl-kos>.<\/span><span class=pl-en>catch<\/span><span class=pl-kos>(<\/span><span class=pl-kos>(<\/span><span class=pl-s1>err<\/span><span class=pl-kos>)<\/span> <span class=pl-c1>=&gt;<\/span> <span class=pl-kos>{<\/span><\/td>\n      <\/tr>\n      <tr>\n        <td id=\"file-dbquery-js-L19\" class=\"blob-num js-line-number\" data-line-number=\"19\"><\/td>\n        <td id=\"file-dbquery-js-LC19\" class=\"blob-code blob-code-inner js-file-line\">          <span class=pl-s1>reject<\/span><span class=pl-kos>(<\/span><span class=pl-s1>err<\/span><span class=pl-kos>)<\/span><span class=pl-kos>;<\/span><\/td>\n      <\/tr>\n      <tr>\n        <td id=\"file-dbquery-js-L20\" class=\"blob-num js-line-number\" data-line-number=\"20\"><\/td>\n        <td id=\"file-dbquery-js-LC20\" class=\"blob-code blob-code-inner js-file-line\">        <span class=pl-kos>}<\/span><span class=pl-kos>)<\/span><span class=pl-kos>;<\/span><\/td>\n      <\/tr>\n      <tr>\n        <td id=\"file-dbquery-js-L21\" class=\"blob-num js-line-number\" data-line-number=\"21\"><\/td>\n        <td id=\"file-dbquery-js-LC21\" class=\"blob-code blob-code-inner js-file-line\">    <span class=pl-kos>}<\/span><span class=pl-kos>)<\/span><span class=pl-kos>;<\/span><\/td>\n      <\/tr>\n      <tr>\n        <td id=\"file-dbquery-js-L22\" class=\"blob-num js-line-number\" data-line-number=\"22\"><\/td>\n        <td id=\"file-dbquery-js-LC22\" class=\"blob-code blob-code-inner js-file-line\">  <span class=pl-kos>}<\/span><span class=pl-kos>,<\/span><\/td>\n      <\/tr>\n      <tr>\n        <td id=\"file-dbquery-js-L23\" class=\"blob-num js-line-number\" data-line-number=\"23\"><\/td>\n        <td id=\"file-dbquery-js-LC23\" class=\"blob-code blob-code-inner js-file-line\"><span class=pl-kos>}<\/span><span class=pl-kos>;<\/span><\/td>\n      <\/tr>\n<\/table>\n\n\n  <\/div>\n\n  <\/div>\n<\/div>\n\n      <\/div>\n      <div class=\"gist-meta\">\n        <a href=\"https://gist.github.com/krofax/873ba763a947d6c68a809faa1d8a8bd5/raw/6ed98fedbce6cf5a05a48f60859ed2ac18b5f828/dbQuery.js\" style=\"float:right\">view raw<\/a>\n        <a href=\"https://gist.github.com/krofax/873ba763a947d6c68a809faa1d8a8bd5#file-dbquery-js\">dbQuery.js<\/a>\n        hosted with &#10084; by <a href=\"https://github.com\">GitHub<\/a>\n      <\/div>\n    <\/div>\n<\/div>\n')