var nodes = {};

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
function importNode(i, node) {
    var id = node['id'];
    // assumes id's are unique
    nodes[id] = node;

    var label = node['name'];
    var nodeclass = "type-";
    if (node['type'] === "def") {
        label = "Def: " + label;
        nodeclass += "def";
    } else {
        nodeclass += "prop";
    }

    var x = g.addNode(id, { label: "<div class='nodetext'>"+label+"</div>", nodeclass: nodeclass });


    console.log(x);
    $.each(node['dependencies'], function(i, dep) {
        g.addEdge(null, dep, node['id']);
    });

    //nodes[id]['el'] = null; // TODO
}


$.getJSON("nodes.json", function(data) {
    $.each(data, importNode);
})
  .fail(function() {
    console.log("fetching JSON failed");
  })

  .done(function() {
    renderer.run(g, d3.select("svg g"));

    $(".node").on("click", function() {
        d3.selectAll(".node").classed("selected", false);
        d3.select(this).classed("selected", true);
    });
  });
