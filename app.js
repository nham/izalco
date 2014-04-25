// Create a new directed graph
var g = new dagreD3.Digraph();

var renderer = new dagreD3.Renderer();

var oldDrawNodes = renderer.drawNodes();
renderer.drawNodes(function(graph, root) {
    var svgNodes = oldDrawNodes(graph, root);
    svgNodes.each(function(u) { d3.select(this).classed(graph.node(u).nodeclass, true); });
    return svgNodes;
});

// WHAT DOES THIS DO LOL
function transition(selection) {
    return selection.transition().duration(500);
}
renderer.transition(transition);

transition(d3.select("svg"));

// something to do with zoom control, possibly also dragging the view window
var svg = d3.select("svg");
d3.select("svg")
  .call(d3.behavior.zoom().on("zoom", function() {
      var ev = d3.event;
      svg.select("g")
        .attr("transform", "translate(" + ev.translate + ") scale(" + ev.scale + ")");
  }));


// fetch all data
$.getJSON("nodes.json", function(data) {
    $.each(data, function(i, node) {
        var label = node['name'];
        var nodeclass = "type-";
        if (node['type'] === "def") {
            label = "Def: " + label;
            nodeclass += "def";
        } else {
            nodeclass += "prop";
        }

        console.log("id = "+node['id']+", label = "+label+", nodeclass = "+nodeclass);
        g.addNode(node['id'],    { label: "<div class='nodetext'>"+label+"</div>", nodeclass: nodeclass });

        $.each(node['dependencies'], function(i, dep) {
        console.log("  dep = "+dep+", id = "+node['id']);
            g.addEdge(null, dep, node['id']);
        });
    });
})
  .fail(function(e) {
    console.log("FAIL");
    console.log(e);
  })
  .done(function() {
    renderer.run(g, d3.select("svg g"));
  });
