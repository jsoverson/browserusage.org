(function(){
  Papa.parse("data/basic_data.csv", {
    header: true,
    dynamicTyping: true,
    download: true,
    complete: function (res) { onReady('data', res.data) }
  });

  google.setOnLoadCallback(function(){ onReady('google') });

  var ready = {
    data : false,
    document : false,
    google : false
  };

  document.onreadystatechange = function() { if (document.readyState === 'complete') onReady('document') };

  function onReady(target, value) {
//  console.log('ready ' + target);
    ready[target] = value || true;
    var waiting = Object.keys(ready).filter(function(key){ return !ready[key]; });
    if (waiting.length === 0) onLoad();
  }

  var browsers = [
    'Chrome (all)',
    'Firefox 5+',
    'Safari 7.0',
    'Safari 8.0',
    'Safari iPad',
    'IE 7.0',
    'IE 8.0',
    'IE 9.0',
    'IE 10.0',
    'IE 11.0'
  ];

  function cullData(data) {
    return data.map(function(row){
      var obj = browsers.reduce(function(acc,next){acc[next] = row[next]; return acc;},{});
      obj.date = new Date(row.Date + '-01');
      return obj;
    });
  }

  function truncateData(data) {
    var date = new Date();
    date.setFullYear(date.getFullYear() - 2);
    return data.filter(function(row){ return row.date > date });
  }

  function dataToArray(data) {
    return data.map(function(row){return [row.date].concat(browsers.map(function(key){return row[key]}))});
  }

  function onLoad() {
    data = dataToArray(truncateData(cullData(ready.data)));
    console.log(ready.data);

    var container = document.getElementById('stats-global');
    var dataTable = new google.visualization.DataTable();
    dataTable.addColumn('date', 'Date');
    browsers.forEach(function(browser){dataTable.addColumn('number', browser);});

    dataTable.addRows(data);

    var options = {
      width: container.offsetWidth,
      height: 400,
      title: 'Global Usage',
      curveType: 'function',
      hAxis: {
        title: 'Date'
      },
      vAxis: {
        format: '#',
        maxValue: 100,
        ticks: [0,10,20,30,40,50,75,100],
        title: 'Usage'
      }
    };
    // Set chart options

    // Instantiate and draw our chart, passing in some options.
    var chart = new google.visualization.LineChart(document.getElementById('stats-global'));

    chart.draw(dataTable, options);

    var table = new google.visualization.Table(document.getElementById('stats-table'));

    table.draw(dataTable, {showRowNumber: true, sortAscending: false, sortColumn: 0});
  }
}());


