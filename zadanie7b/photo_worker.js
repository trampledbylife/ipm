onmessage = function (e) {
    var data = JSON.parse(e.data);

    //console.log(data[0]["text"].charAt(0).charCodeAt(0));
    //console.log(data[0]["text"].charAt(1).charCodeAt(0));

    var value = 0;

    for(i in data[0]["text"])
    {
        //zakres asci dla małych liter
        if(data[0]["text"].charAt(i).charCodeAt(0) >= 97 && data[0]["text"].charAt(i).charCodeAt(0)<=122)
        {
            value += data[0]["text"].charAt(i).charCodeAt(0) - 96;
        }
        //zakres asci dla duzych liter
        if(data[0]["text"].charAt(i).charCodeAt(0) >= 65 && data[0]["text"].charAt(i).charCodeAt(0)<=90)
        {
            value += data[0]["text"].charAt(i).charCodeAt(0) - 64 + 30;
        }
    }

    var r = value%255;
    var g = 255-(value%255);
    var b = (0.5*r>125)?99:199
    //console.log(r, g, b);
    //postMessage(data);


    var jsonobject = [];
    var item = {};
    item["r"] = r;
    item["g"] = g;
    item["b"] = b;
    jsonobject.push(item);
    postMessage(JSON.stringify(jsonobject));


};