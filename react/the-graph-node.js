(function (context) {
  "use strict";

  var TheGraph = context.TheGraph;

  // Font Awesome
  var faKeys = Object.keys(TheGraph.FONT_AWESOME);

  // Node view

  TheGraph.Node = React.createClass({
    getInitialState: function() {
      return {
        // Random icon just for fun
        icon: faKeys[ Math.floor(Math.random()*faKeys.length) ]
      };
    },
    render: function() {
      var label = this.props.process.metadata.label;
      if (label === undefined || label === "") {
        label = this.props.process.key;
      }
      var x = this.props.process.metadata.x;
      var y = this.props.process.metadata.y;

      // Ports
      var count = this.props.ports.inports.length;
      var index = 0;
      var inports = this.props.ports.inports.map(function(info){
        index++;
        info.y = TheGraph.nodeRadius + (TheGraph.nodeSide / (count+1) * index);
        return TheGraph.Port(info);
      });

      count = this.props.ports.outports.length;
      index = 0;
      var outports = this.props.ports.outports.map(function(info){
        index++;
        info.y = TheGraph.nodeRadius + (TheGraph.nodeSide / (count+1) * index);
        return TheGraph.Port(info);
      });

      return (
        React.DOM.g(
          {
            className: "node",
            name: this.props.key,
            key: this.props.key,
            transform: "translate("+x+","+y+")"
          },
          React.DOM.rect({
            className: "node-rect drag",
            name: this.props.key, // makes it draggable
            width: TheGraph.nodeSize,
            height: TheGraph.nodeSize,
            rx: TheGraph.nodeRadius,
            ry: TheGraph.nodeRadius
          }),
          React.DOM.text({
            className: "node-icon drag",
            name: this.props.key, // makes it draggable
            x: TheGraph.nodeSize/2,
            y: TheGraph.nodeSize/2,
            children: TheGraph.FONT_AWESOME[this.state.icon]
          }),
          React.DOM.g({
            className: "inports",
            children: inports
          }),
          React.DOM.g({
            className: "outports",
            children: outports
          }),
          React.DOM.text({
            className: "node-label",
            x: TheGraph.nodeSize/2,
            y: TheGraph.nodeSize + 20,
            children: label
          })
        )
      );
    }
  });


})(this);