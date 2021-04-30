confirm("Ölkəni və məlumat almaq istədiyiniz tarixi qeyd edin.Sonra linkə keçid edin.")

function clearALL(){
    $("#articles-list").empty()
}

$("#clear-all").on('click',function(){
    clearALL()
})

function displayValue(){
    var inp = $("#search-term").val()
    var startYear = $("#start-year").val()
    var endYEAR = $("#end-year").val()

    var obj = {
        q: inp,
        'api-key':'LnAXxbYsdUBeBwOasHWRITKCnj9b9uP1'
    }

    if (startYear) {
        obj['begin_date'] = startYear + '0101';
    }

    if (endYEAR) {
        obj['end_date'] = endYEAR + '1231';
    }

    return obj;
}

$("#run-search").on('click',function(){
    var netice = displayValue()

    $.ajax({
        url: 'https://api.nytimes.com/svc/search/v2/articlesearch.json',
        method:'GET',
        data:netice,
    }).done(function(cavab){
        // console.log(cavab.response.docs)
        var country = cavab.response.docs

        for(var i =0;i<country.length;i++){
            var xeber = country[i]
            console.log(xeber.web_url)
            var web = xeber.web_url
            var head = xeber.headline.main
            var text = xeber.abstract
            $("#articles-list").prepend(`<div class = one><h4><a href="${web}" target="_blank">${head}</a></h4>
            </div>
            `)
        }
    })
})
