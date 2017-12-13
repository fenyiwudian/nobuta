$(function(){

    var removeXss = function(node){
        var count = 1;
        node.removeAttribute('onclick');
        node.removeAttribute('src');
        for(var i = 0; i < node.children.length; i++){
            count += removeXss(node.children[i]);
        }
        return count;
    };

    var filterXss = function(text){
        var div = document.createElement('div');
        div.innerHTML = text;
        console.log(removeXss(div) + ' nodes');
        return div.innerHTML;
    };
    var textarea = document.getElementById('textarea');
    var submit_direct = document.getElementById('submit_direct');
    var submit_filter = document.getElementById('submit_filter');
    var result = document.getElementById('result');
    submit_direct.onclick = function () {
        result.innerHTML = textarea.value;
    };
    submit_filter.onclick = function(){
        result.innerHTML = filterXss(textarea.value);
    };

    var mainDiv = document.createElement('div');
    mainDiv.setAttribute('id', 'main');
    document.body.appendChild(mainDiv);

    // // executable
    // var $body = $(document.body);
    // var a = '<script>alert("append a script tag string with jquery")</script>';
    // $body.append(a);

    // // executable
    // var b = 'alert("append a script element vanilla")';
    // var script = document.createElement('script');
    // script.textContent = b;
    // document.body.appendChild(script);

    // // executable
    // var c = 'alert("append a div in which there is a script element")';
    // var div = document.createElement('div');
    // var script_2 = document.createElement('script');
    // script_2.textContent = c;
    // div.appendChild(script_2);
    // document.body.appendChild(div);

    // // unexecutable although the dom result is same as above case
    // var d = '<script>alert("append a div that has script tag as innerHTML")</script>';
    // var div_d = document.createElement('div');
    // div_d.innerHTML = d;
    // document.body.appendChild(div_d);


    // script change will not trigger executing again
    // var e = 'alert("change script element\'s text content")';
    // var script_e = document.createElement('script');
    // script_e.textContent = 'alert("origin alert")';
    // document.body.appendChild(script_e);
    // setTimeout(function(){
    //     script_e.textContent = e;
    // }, 1000);

    // XXXXXXXXX
    // var f = 'javascript:alert("image src")';
    // var img_f = document.createElement('img');
    // img_f.setAttribute('src', f);
    // mainDiv.appendChild(img_f);
});

