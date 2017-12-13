$(function () {
    // 从 https://developer.mozilla.org/zh-CN/docs/Web/Events 中的事件列表中
    // 找出能运用于Element的事件并进行测试,这写事件都有可能用于XSS攻击
    var list = [];


    var bindCommonEvent = function (elem, attr) {
        attr = typeof attr === 'string' ? [attr] : attr;
        attr.forEach(a => {
            elem.setAttribute('on' + a, 'console.log("' + a + '")');
            list.push(a);
        });
    };

    var getDiv = function (attr) {
        var div = document.createElement('div');
        div.innerText = attr;
        bindCommonEvent(div, attr);
        return div;
    };

    var getInput = function (attr) {
        var input = document.createElement('input');
        input.value = attr;
        bindCommonEvent(input, attr);
        return input;
    };

    var getAnimation = function (attr, animName) {
        var div = document.createElement('div');
        div.className = animName;
        bindCommonEvent(div, attr);
        div.innerText = attr;
        return div;
    };


    var getTransition = function (attr) {
        var div = document.createElement('div');
        div.style.color = 'red';
        div.style.transition = 'color 5s';
        setTimeout(function () {
            div.style.color = 'green';
        }, 1000);
        div.innerText = attr;
        bindCommonEvent(div, attr);
        return div;
    };


    var getScroll = function (attr) {
        var div = document.createElement('div');
        div.style.height = '100px';
        div.style.overflow = 'scroll';
        var innerDiv = document.createElement('div');
        innerDiv.style.height = '200px';
        innerDiv.innerText = attr;
        bindCommonEvent(div, attr);
        div.appendChild(innerDiv);
        return div;
    };


    var getImg = function (attr, url) {
        var img = document.createElement('img');
        bindCommonEvent(img, attr);
        setTimeout(function () {
            img.setAttribute('src', url);
        }, 1000);
        return img;
    };

    var getUnload = function (attr) {
        var iframe = document.createElement('iframe');
        iframe.src = 'https://www.sina.com';
        bindCommonEvent(iframe, attr);
        setTimeout(function () {
            iframe.src = '';
        }, 4000);
        return iframe;
    };


    var getScript = function (attr) {
        var script = document.createElement('script');
        bindCommonEvent(script, attr);
        script.innerText = 'console.log("script executed")';
        return script;
    };


    var getDialog = function (attr) {
        var dialog = document.createElement('dialog');
        dialog.setAttribute('open', 'true');
        dialog.innerText = attr;
        bindCommonEvent(dialog, attr);
        setTimeout(function () {
            dialog.close();
        }, 5000);
        return dialog;
    };


    var getVideo = function (attr) {
        var video = document.createElement('video');
        video.setAttribute('controls', 'true');
        video.setAttribute('src', 'https://media.cform.io/persist/csvfx/editor/dc326130-841b-4a20-b3eb-b5b73a58e1f7/video/0533DD01.mp4');
        bindCommonEvent(video, attr);
        return video;
    };


    var getForm = function (attr) {
        var form = document.createElement('form');
        var input = document.createElement('input');
        bindCommonEvent(form, attr);
        bindCommonEvent(input, attr);
        input.pattern = "\\d+";
        form.appendChild(input);
        var submit = document.createElement('input');
        submit.type = 'submit';
        submit.value = 'submit';
        form.appendChild(submit);

        var reset = document.createElement('input');
        reset.type = 'reset';
        reset.value = 'reset';
        form.appendChild(reset);
        return form;
    };

    var getContextMenu = function (attr) {
        var container = document.createElement('div');
        var div = document.createElement('div');
        div.innerText = attr;
        div.setAttribute('contextmenu', 'share');
        container.appendChild(div);
        var menu = document.createElement('menu');
        menu.id = 'share';
        menu.setAttribute('type', 'context');
        menu.innerHTML = `<menuitem label="Twitter"></menuitem>
                <menuitem label="Facebook"></menuitem>`;
        bindCommonEvent(menu, attr);
        container.appendChild(menu);
        return container;
    };


    var getSVG = function () {
        var svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
        svg.setAttribute('width', '200');
        svg.setAttribute('height', '200');
        var rect = document.createElementNS('http://www.w3.org/2000/svg', 'rect');
        rect.setAttribute('width', '20');
        rect.setAttribute('height', '20');
        rect.setAttribute('x', '50');
        rect.setAttribute('y', '50');
        rect.setAttribute('fill', 'red');

        rect.addEventListener('DOMAttrModified', function () {
            console.log('DOMAttrModified');
        });

        svg.appendChild(rect);

        setTimeout(function () {
            rect.setAttribute('width', '300');
        }, 2000);
        return svg;
    };


    var getVirtual = function (attr) {
        var div = document.createElement('div');
        bindCommonEvent(div, attr);
        return div;
    };



    var viceDiv = document.createElement('div');
    viceDiv.setAttribute('id', 'vice');
    document.body.appendChild(viceDiv);


    viceDiv.appendChild(getDiv('beforecopy'));
    viceDiv.appendChild(getInput('beforepaste'));
    viceDiv.appendChild(getInput('beforecut'));
    viceDiv.appendChild(getDiv('copy'));
    viceDiv.appendChild(getInput('paste'));
    viceDiv.appendChild(getInput('cut'));

    viceDiv.appendChild(getAnimation('animationstart', 'red_to_yellow_one_time'));
    viceDiv.appendChild(getAnimation('animationend', 'red_to_yellow_one_time'));
    viceDiv.appendChild(getAnimation('animationiteration', 'red_to_yellow_loop'));


    viceDiv.appendChild(getTransition('transitionend'));

    viceDiv.appendChild(getScroll('scroll'));
    viceDiv.appendChild(getScroll('wheel'));

    viceDiv.appendChild(getInput('blur'));
    viceDiv.appendChild(getDiv('click'));
    viceDiv.appendChild(getDiv('dblclick'));
    viceDiv.appendChild(getInput('focus'));
    viceDiv.appendChild(getInput('focusin'));
    viceDiv.appendChild(getInput('focusout'));
    viceDiv.appendChild(getInput('input'));
    viceDiv.appendChild(getInput('keypress'));
    viceDiv.appendChild(getInput('keyup'));
    viceDiv.appendChild(getInput('keydown'));
    viceDiv.appendChild(getInput('select'));
    viceDiv.appendChild(getInput('change'));

    viceDiv.appendChild(getDiv('mousedown'));
    viceDiv.appendChild(getDiv('mouseenter'));
    viceDiv.appendChild(getDiv('mouseleave'));
    viceDiv.appendChild(getDiv('mousemove'));
    viceDiv.appendChild(getDiv('mouseout'));
    viceDiv.appendChild(getDiv('mouseover'));
    viceDiv.appendChild(getDiv('mouseup'));


    viceDiv.appendChild(getDiv('gotpointercapture'));
    viceDiv.appendChild(getDiv('lostpointercapture'));
    viceDiv.appendChild(getDiv('pointercancel'));
    viceDiv.appendChild(getDiv('pointerdown'));
    viceDiv.appendChild(getDiv('pointerenter'));
    viceDiv.appendChild(getDiv('pointerleave'));
    viceDiv.appendChild(getDiv('pointermove'));
    viceDiv.appendChild(getDiv('pointerout'));
    viceDiv.appendChild(getDiv('pointerover'));
    viceDiv.appendChild(getDiv('pointerup'));
    viceDiv.appendChild(getSVG('pointerup'));

    viceDiv.appendChild(getDiv(['touchcancel', 'touchend', 'touchmove', 'touchstart']));


    viceDiv.appendChild(getUnload('unload'));
    viceDiv.appendChild(getDialog(['cancel', 'close']));


    viceDiv.appendChild(getVideo(['canplay', 'canplaythrough', 'playing', 'waiting', 'seeking',
        'seeked', 'ended', 'loadedmetadata', 'loadeddata', 'durationchange', 'timeupdate', 'play', 'pause', 'ratechange', 'volumechange',
        'suspend', 'emptied', 'stalled']));



    viceDiv.appendChild(getForm(['invalid', 'reset', 'submit']));
    viceDiv.appendChild(getContextMenu(['show', 'contextmenu']));


    viceDiv.appendChild(getVirtual(['drag', 'gragend', 'dragenter', 'dragexit',
        'dragleave', 'dragover', 'dragstart', 'drop']));
    viceDiv.appendChild(getVirtual(['webglcontextcreationerror', 'webglcontextlost', 'webglcontextrestored']));

    viceDiv.appendChild(getImg('error', 'https://www.baidu.com/a.jpg'));
    viceDiv.appendChild(getImg(['load', 'loadend', 'loadstart', 'progress'],
        'https://ss0.bdstatic.com/5aV1bjqh_Q23odCf/static/superman/img/logo/bd_logo1_31bdc765.png'));

    viceDiv.appendChild(getScript('beforescriptexecute'));

    console.log(list);
});