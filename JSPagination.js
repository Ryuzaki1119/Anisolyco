var nopage;
var jenis;
var nomerhal;
var lblname1;

halamanblogger();
	function loophalaman(banyakdata){
		var html = '';
		nomerkiri = parseInt(numshowpage / 2);
		if (nomerkiri == numshowpage - nomerkiri){
			numshowpage = nomerkiri * 2 + 1
		}
		mulai = nomerhal - nomerkiri;
		if (mulai < 1) mulai = 1;
		maksimal = parseInt(banyakdata / postperpage) + 1;
		if (maksimal - 1 == banyakdata / postperpage) maksimal = maksimal - 1;
		akhir = mulai + numshowpage - 1;
		if (akhir > maksimal) akhir = maksimal;
		html += "<span class='showpageOf'>Page " + nomerhal + ' of ' + maksimal + "</span>";
		var prevnomer = parseInt(nomerhal) - 1;
		if (nomerhal > 1){
			if (nomerhal == 2){
				if (jenis == "page"){
					html += '<span class="showpage page-item"><a class="page-link" href="' + home_page + '">' + upPageWord + '</a></span>'
				}
				else{
					html += '<span class="showpageNum page-item"><a class="page-link" href="/search/label/' + lblname1 + '?max-results=' + postperpage + '">' + upPageWord + '</a></span>'
				}
			}
			else{
				if (jenis == "page"){
					html += '<span class="showpageNum page-item"><a class="page-link" href="#" onclick="redirectpage(' + prevnomer + ');return false">' + upPageWord + '</a></span>'
				}
				else{
					html += '<span class="showpageNum page-item"><a class="page-link" href="#" onclick="redirectlabel(' + prevnomer + ');return false">' + upPageWord + '</a></span>'
				}
			}
		}
		if (mulai > 1){
			if (jenis == "page"){
				html += '<span class="showpageNum page-item"><a class="page-link" href="' + home_page + '">1</a></span>'
			}
			else{
				html += '<span class="showpageNum page-item"><a class="page-link" href="/search/label/' + lblname1 + '?max-results=' + postperpage + '">1</a></span>'
			}
		}
		if (mulai > 2){
			html += ' ... '
		}
		for (var jj = mulai; jj <= akhir; jj++){
			if (nomerhal == jj){
				html += '<span class="showpagePoint page-item active"><a class="page-link">' + jj + '<span class="sr-only">(current)</span>'</span>'
			}
			else if (jj == 1){
				if (jenis == "page"){
					html += '<span class="showpageNum page-item"><a class="page-link" href="' + home_page + '">1</a></span>'
				}
				else{
					html += '<span class="showpageNum page-item"><a class="page-link" href="/search/label/' + lblname1 + '?max-results=' + postperpage + '">1</a></span>'
				}
			}
			else{
				if (jenis == "page"){
					html += '<span class="showpageNum page-item"><a class="page-link" href="#" onclick="redirectpage(' + jj + ');return false">' + jj + '</a></span>'
				}
				else{
					html += '<span class="showpageNum page-item"><a class="page-link" href="#" onclick="redirectlabel(' + jj + ');return false">' + jj + '</a></span>'
				}
			}
		}
		if (akhir < maksimal - 1){
			html += '...'
		}
		if (akhir < maksimal){
			if (jenis == "page"){
				html += '<span class="showpageNum page-item"><a class="page-link" href="#" onclick="redirectpage(' + maksimal + ');return false">' + maksimal + '</a></span>'
			}
			else{
				html += '<span class="showpageNum page-item"><a class="page-link" href="#" onclick="redirectlabel(' + maksimal + ');return false">' + maksimal + '</a></span>'
			}
		}
		var nextnomer = parseInt(nomerhal) + 1;
		if (nomerhal < maksimal){
			if (jenis == "page"){
				html += '<span class="showpageNum page-item"><a class="page-link" href="#" onclick="redirectpage(' + nextnomer + ');return false">' + downPageWord + '</a></span>'
			}
			else{
				html += '<span class="showpageNum page-item"><a class="page-link" href="#" onclick="redirectlabel(' + nextnomer + ');return false">' + downPageWord + '</a></span>'
			}
		}
		var pageArea = document.getElementsByName("pageArea");
		var blogPager = document.getElementById("blog-pager");
		for (var p = 0; p < pageArea.length; p++){
			pageArea[p].innerHTML = html
		}
		if (pageArea && pageArea.length > 0){
			html = ''
		}
		if (blogPager){
			blogPager.innerHTML = html
		}
	}
	function hitungtotaldata(root){
		var feed = root.feed;
		var totaldata = parseInt(feed.openSearch$totalResults.$t, 10);
		loophalaman(totaldata)
	}
	
	function halamanblogger(){
		var thisUrl = urlactivepage;
		if (thisUrl.indexOf("/search/label/") != -1){
			if (thisUrl.indexOf("?updated-max") != -1){
				lblname1 = thisUrl.substring(thisUrl.indexOf("/search/label/") + 14, thisUrl.indexOf("?updated-max"))
			}
			else{
				lblname1 = thisUrl.substring(thisUrl.indexOf("/search/label/") + 14, thisUrl.indexOf("?max"))
			}
		}
		if(thisUrl.indexOf("?q=") == -1 && thisUrl.indexOf(".html") == -1){
			if(thisUrl.indexOf("/search/label/") == -1){
				jenis = "page";
				if (urlactivepage.indexOf("#PageNo=") != -1){
					nomerhal = urlactivepage.substring(urlactivepage.indexOf("#PageNo=") + 8, urlactivepage.length)
				}
				else{
					nomerhal = 1
				}
			document.write("<script src=\"" + home_page + "feeds/posts/summary?max-results=1&alt=json-in-script&callback=hitungtotaldata\"><\/script>")
			}
			else{
				jenis = "label";
				if (thisUrl.indexOf("max-results=") == -1){
					postperpage = 20
				}
				if (urlactivepage.indexOf("#PageNo=") != -1){
					nomerhal = urlactivepage.substring(urlactivepage.indexOf("#PageNo=") + 8, urlactivepage.length)
				}
				else{
					nomerhal = 1
				}
				document.write('<script src="' + home_page + 'feeds/posts/summary/-/' + lblname1 + '?alt=json-in-script&callback=hitungtotaldata&max-results=1" ><\/script>')
			}
		}
	}	
	function redirectpage(numberpage){
		jsonstart = (numberpage - 1) * postperpage;
		nopage = numberpage;
		var nBody = document.getElementsByTagName('head')[0];
		var newInclude = document.createElement('script');
		newInclude.type = 'text/javascript';
		newInclude.setAttribute("src", home_page + "feeds/posts/summary?start-index=" + jsonstart + "&max-results=1&alt=json-in-script&callback=finddatepost");
		nBody.appendChild(newInclude)
	}
	function redirectlabel(numberpage){
		jsonstart = (numberpage - 1) * postperpage;
		nopage = numberpage;
		var nBody = document.getElementsByTagName('head')[0];
		var newInclude = document.createElement('script');
		newInclude.type = 'text/javascript';
		newInclude.setAttribute("src", home_page + "feeds/posts/summary/-/" + lblname1 + "?start-index=" + jsonstart + "&max-results=1&alt=json-in-script&callback=finddatepost");
		nBody.appendChild(newInclude)
	}	
	function finddatepost(root){
		post = root.feed.entry[0];
		var timestamp1 = post.published.$t.substring(0, 19) + post.published.$t.substring(23, 29);
		var timestamp = encodeURIComponent(timestamp1);
		if(jenis == "page"){
			var alamat = "/search?updated-max=" + timestamp + "&max-results=" + postperpage + "#PageNo=" + nopage
		}
		else{
			var alamat = "/search/label/" + lblname1 + "?updated-max=" + timestamp + "&max-results=" + postperpage + "#PageNo=" + nopage
		}
		location.href = alamat
		}