// Create a new directed graph
var g = new dagreD3.Digraph();

// Add nodes to the graph. The first argument is the node id. The second is
// metadata about the node. In this case we're going to add labels to each of
// our nodes.
g.addNode("group",    { label: "Def: Group" });
g.addNode("basic_group_facts",    { label: "Basic Group Facts" });
g.addNode("abgroup",    { label: "Def: Abelian Group" });
g.addNode("field",  { label: "Def: Field" });
g.addNode("vectorspace",      { label: "Def: Vector Space" });
g.addNode("basic_vs_facts",     { label: "Basic Vector Space Facts" });
g.addNode("independent_set",     { label: "Def: Independent Set" });
g.addNode("generating_set",     { label: "Def: Generating Set" });
g.addNode("scaling",     { label: "Def: Scaling" });
g.addNode("linear_combination",     { label: "Def: Linear Combination" });
g.addNode("basis",     { label: "Def: Basis" });
g.addNode("generalized_vector_sum",     { label: "Def: Generalized Vector Sum" });

// Add edges to the graph. The first argument is the edge id. Here we use null
// to indicate that an arbitrary edge id can be assigned automatically. The
// second argument is the source of the edge. The third argument is the target
// of the edge. The last argument is the edge metadata.
g.addEdge(null, "group",   "basic_group_facts");
g.addEdge(null, "group",   "abgroup");
g.addEdge(null, "abgroup",   "vectorspace");
g.addEdge(null, "field", "vectorspace");
g.addEdge(null, "vectorspace",     "basic_vs_facts");
g.addEdge(null, "vectorspace",     "generalized_vector_sum");
g.addEdge(null, "generalized_vector_sum",     "linear_combination");
g.addEdge(null, "vectorspace",     "scaling");
g.addEdge(null, "vectorspace",     "linear_combination");
g.addEdge(null, "scaling",     "linear_combination");

g.addEdge(null, "vectorspace",     "independent_set");
g.addEdge(null, "linear_combination",     "independent_set");

g.addEdge(null, "vectorspace",     "generating_set");
g.addEdge(null, "linear_combination",     "generating_set");

g.addEdge(null, "independent_set",     "basis");
g.addEdge(null, "generating_set",     "basis");


var renderer = new dagreD3.Renderer();

// WHAT DOES THIS DO LOL
  function transition(selection) {
    return selection.transition().duration(500);
  }

  renderer.transition(transition);

var layout = renderer.run(g, d3.select("svg g"));

transition(d3.select("svg"));

// WHAT DOES THIS DO LOL
  var svg = d3.select("svg");
  d3.select("svg")
    .call(d3.behavior.zoom().on("zoom", function() {
      var ev = d3.event;
      svg.select("g")
        .attr("transform", "translate(" + ev.translate + ") scale(" + ev.scale + ")");
    }));
