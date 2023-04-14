function downloadVideo() {
    var videoLink = document.getElementById("video-link").value;
    var resultDiv = document.getElementById("result");
  
    if (videoLink != "") {
      var xhr = new XMLHttpRequest();
      xhr.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
          var response = JSON.parse(this.responseText);
          if (response.status_code == 0) {
            var videoUrl = response.item.video.download_addr;
            var fileName = videoUrl.substring(videoUrl.lastIndexOf("/") + 1);
            var videoTitle = response.item.desc;
            var downloadLink = "<a href='" + videoUrl + "' download='" + fileName + "'>" + videoTitle + "</a>";
            resultDiv.innerHTML = downloadLink;
          } else {
            resultDiv.innerHTML = "Error: " + response.status_msg;
          }
        }
      };
      xhr.open("POST", "https://www.iesdouyin.com/web/api/v2/aweme/iteminfo/?item_ids=" + getVideoId(videoLink), true);
      xhr.send();
    } else {
      resultDiv.innerHTML = "Please enter a valid TikTok video link.";
    }
  }
  
  function getVideoId(link) {
    var regex = /\/video\/(\d+)/;
    var match = regex.exec(link);
    if (match != null && match.length > 1) {
      return match[1];
    } else {
      return null;
    }
  }
  