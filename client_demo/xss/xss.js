var html = `<div onbeforecopy="console.log(&quot;beforecopy&quot;)">beforecopy</div><input onbeforepaste="console.log(&quot;beforepaste&quot;)"><input onbeforecut="console.log(&quot;beforecut&quot;)"><div oncopy="console.log(&quot;copy&quot;)">copy</div><input onpaste="console.log(&quot;paste&quot;)"><input oncut="console.log(&quot;cut&quot;)"><div class="red_to_yellow_one_time" onanimationstart="console.log(&quot;animationstart&quot;)">animationstart</div><div class="red_to_yellow_one_time" onanimationend="console.log(&quot;animationend&quot;)">animationend</div><div class="red_to_yellow_loop" onanimationiteration="console.log(&quot;animationiteration&quot;)">animationiteration</div><div ontransitionend="console.log(&quot;transitionend&quot;)" style="color: green; transition: color 5s;">transitionend</div><div onscroll="console.log(&quot;scroll&quot;)" style="height: 100px; overflow: scroll;"><div style="height: 200px;">scroll</div></div><div onwheel="console.log(&quot;wheel&quot;)" style="height: 100px; overflow: scroll;"><div style="height: 200px;">wheel</div></div><input onblur="console.log(&quot;blur&quot;)"><div onclick="console.log(&quot;click&quot;)">click</div><div ondblclick="console.log(&quot;dblclick&quot;)">dblclick</div><input onfocus="console.log(&quot;focus&quot;)"><input onfocusin="console.log(&quot;focusin&quot;)"><input onfocusout="console.log(&quot;focusout&quot;)"><input oninput="console.log(&quot;input&quot;)"><input onkeypress="console.log(&quot;keypress&quot;)"><input onkeyup="console.log(&quot;keyup&quot;)"><input onkeydown="console.log(&quot;keydown&quot;)"><input onselect="console.log(&quot;select&quot;)"><input onchange="console.log(&quot;change&quot;)"><div onmousedown="console.log(&quot;mousedown&quot;)">mousedown</div><div onmouseenter="console.log(&quot;mouseenter&quot;)">mouseenter</div><div onmouseleave="console.log(&quot;mouseleave&quot;)">mouseleave</div><div onmousemove="console.log(&quot;mousemove&quot;)">mousemove</div><div onmouseout="console.log(&quot;mouseout&quot;)">mouseout</div><div onmouseover="console.log(&quot;mouseover&quot;)">mouseover</div><div onmouseup="console.log(&quot;mouseup&quot;)">mouseup</div><div ongotpointercapture="console.log(&quot;gotpointercapture&quot;)">gotpointercapture</div><div onlostpointercapture="console.log(&quot;lostpointercapture&quot;)">lostpointercapture</div><div onpointercancel="console.log(&quot;pointercancel&quot;)">pointercancel</div><div onpointerdown="console.log(&quot;pointerdown&quot;)">pointerdown</div><div onpointerenter="console.log(&quot;pointerenter&quot;)">pointerenter</div><div onpointerleave="console.log(&quot;pointerleave&quot;)">pointerleave</div><div onpointermove="console.log(&quot;pointermove&quot;)">pointermove</div><div onpointerout="console.log(&quot;pointerout&quot;)">pointerout</div><div onpointerover="console.log(&quot;pointerover&quot;)">pointerover</div><div onpointerup="console.log(&quot;pointerup&quot;)">pointerup</div><svg width="200" height="200"><rect width="300" height="20" x="50" y="50" fill="red"></rect></svg><div ontouchcancel="console.log(&quot;touchcancel&quot;)" ontouchend="console.log(&quot;touchend&quot;)" ontouchmove="console.log(&quot;touchmove&quot;)" ontouchstart="console.log(&quot;touchstart&quot;)">touchcancel,touchend,touchmove,touchstart</div><iframe src="" onunload="console.log(&quot;unload&quot;)"></iframe><dialog oncancel="console.log(&quot;cancel&quot;)" onclose="console.log(&quot;close&quot;)">cancel,close</dialog><video controls="true" src="https://media.cform.io/persist/csvfx/editor/dc326130-841b-4a20-b3eb-b5b73a58e1f7/video/0533DD01.mp4" oncanplay="console.log(&quot;canplay&quot;)" oncanplaythrough="console.log(&quot;canplaythrough&quot;)" onplaying="console.log(&quot;playing&quot;)" onwaiting="console.log(&quot;waiting&quot;)" onseeking="console.log(&quot;seeking&quot;)" onseeked="console.log(&quot;seeked&quot;)" onended="console.log(&quot;ended&quot;)" onloadedmetadata="console.log(&quot;loadedmetadata&quot;)" onloadeddata="console.log(&quot;loadeddata&quot;)" ondurationchange="console.log(&quot;durationchange&quot;)" ontimeupdate="console.log(&quot;timeupdate&quot;)" onplay="console.log(&quot;play&quot;)" onpause="console.log(&quot;pause&quot;)" onratechange="console.log(&quot;ratechange&quot;)" onvolumechange="console.log(&quot;volumechange&quot;)" onsuspend="console.log(&quot;suspend&quot;)" onemptied="console.log(&quot;emptied&quot;)" onstalled="console.log(&quot;stalled&quot;)"></video><form oninvalid="console.log(&quot;invalid&quot;)" onreset="console.log(&quot;reset&quot;)" onsubmit="console.log(&quot;submit&quot;)"><input oninvalid="console.log(&quot;invalid&quot;)" onreset="console.log(&quot;reset&quot;)" onsubmit="console.log(&quot;submit&quot;)" pattern="\d+"><input type="submit" value="submit"><input type="reset" value="reset"></form><div><div contextmenu="share">show,contextmenu</div><menu id="share" type="context" onshow="console.log(&quot;show&quot;)" oncontextmenu="console.log(&quot;contextmenu&quot;)"><menuitem label="Twitter"></menuitem>
<menuitem label="Facebook"></menuitem></menu></div><div ondrag="console.log(&quot;drag&quot;)" ongragend="console.log(&quot;gragend&quot;)" ondragenter="console.log(&quot;dragenter&quot;)" ondragexit="console.log(&quot;dragexit&quot;)" ondragleave="console.log(&quot;dragleave&quot;)" ondragover="console.log(&quot;dragover&quot;)" ondragstart="console.log(&quot;dragstart&quot;)" ondrop="console.log(&quot;drop&quot;)"></div><div onwebglcontextcreationerror="console.log(&quot;webglcontextcreationerror&quot;)" onwebglcontextlost="console.log(&quot;webglcontextlost&quot;)" onwebglcontextrestored="console.log(&quot;webglcontextrestored&quot;)"></div><img onerror="console.log(&quot;error&quot;)" src="https://www.baidu.com/a.jpg"><img onload="console.log(&quot;load&quot;)" onloadend="console.log(&quot;loadend&quot;)" onloadstart="console.log(&quot;loadstart&quot;)" onprogress="console.log(&quot;progress&quot;)" src="https://ss0.bdstatic.com/5aV1bjqh_Q23odCf/static/superman/img/logo/bd_logo1_31bdc765.png"><script onbeforescriptexecute="console.log(&quot;beforescriptexecute&quot;)">console.log("script executed")</script>`;
var list = ["beforecopy", "beforepaste", "beforecut", "copy", "paste", "cut", "animationstart",
    "animationend", "animationiteration", "transitionend", "scroll", "wheel", "blur", "click",
    "dblclick", "focus", "focusin", "focusout", "input", "keypress", "keyup", "keydown", "select",
    "change", "mousedown", "mouseenter", "mouseleave", "mousemove", "mouseout", "mouseover",
    "mouseup", "gotpointercapture", "lostpointercapture", "pointercancel", "pointerdown",
    "pointerenter", "pointerleave", "pointermove", "pointerout", "pointerover", "pointerup",
    "touchcancel", "touchend", "touchmove", "touchstart", "unload", "cancel", "close", "canplay",
    "canplaythrough", "playing", "waiting", "seeking", "seeked", "ended", "loadedmetadata",
    "loadeddata", "durationchange", "timeupdate", "play", "pause", "ratechange", "volumechange",
    "suspend", "emptied", "stalled", "invalid", "reset", "submit", "invalid", "reset", "submit",
    "show", "contextmenu", "drag", "dragend", "dragenter", "dragexit", "dragleave", "dragover",
    "dragstart", "drop", "webglcontextcreationerror", "webglcontextlost", "webglcontextrestored",
    "error", "load", "loadend", "loadstart", "progress"];


var removeXss = function (node) {
    if (node.tagName === 'SCRIPT') {
        node.parentNode.removeChild(node);
    } else {
        list.forEach(function (text) {
            node.removeAttribute('on' + text);
        });
        for (var i = node.children.length - 1; i >= 0; i--) {
            removeXss(node.children[i]);
        }
    }
};

$(function () {
    var start = Date.now();
    var div = document.createElement('div');
    div.innerHTML = html;
    var middle = Date.now();
    console.log(middle - start);
    removeXss(div);
    var almost = Date.now();
    console.log(almost - middle);
    $('#xss').html(div.innerHTML);
    var end = Date.now();
    console.log(end - almost);
});