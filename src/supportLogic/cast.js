
import GoogleCast from 'react-native-google-cast';

export default function castVid(title, url, type, live=false) {
    // GoogleCast.getCastDevice().then((data)=>{alert(data)})
    console.log("DD>>: ", url);
    GoogleCast.castMedia({
        mediaUrl: url,
        title: title,
        subtitle:
            'Giant Play',
        contentType: type, //"video/mp4", // Optional, default is "video/mp4"
        isLive: live,
    })
    if (!live) GoogleCast.launchExpandedControls()
    return GoogleCast.SESSION_STARTED
    // return true
}