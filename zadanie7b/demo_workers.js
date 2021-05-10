onmessage = function (e) {
    var data = JSON.parse(e.data);

    for(i in data[0])
    {
        data[0][i] = data[0][i].split('').map(function(char)
        {
            return char === char.toUpperCase() ? char.toLowerCase() : char.toUpperCase()
        }).join('')
    }
    postMessage(data);
};
