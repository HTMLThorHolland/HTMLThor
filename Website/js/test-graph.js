function init() {
 
  // Instanciate sigma.js and customize it :
  var sigInst = sigma.init(document.getElementById('sigma-example')).drawingProperties({
    defaultLabelColor: '#fff'
  });
 
  // Generate a random graph with :
  //   . N nodes
  //   . E edges
  var i, N = 10, E = 20;
  
  var jono = ['jonoId', [1, 1, 'jonofile', 10, 'blue',['simonId']]];
  var simon = ['simonId', [20, 20, 'simonfile', 12, 'red',['fatimahId']]];
  var fatimah = ['fatimahId', [7, 5, 'fatiFile', 20, 'green',[]]];
  var thor = ['thorId', [2, 7, 'thorFile', 20, 'yellow',['simonId','jonoId']]];
  
  var collect = [jono, fatimah, simon, thor];
  
  for(i=0; i < collect.length; i++) {
	nodeId = collect[i][0];
	nodeX = collect[i][1][0];
	nodeY = collect[i][1][1];
	nodeName = collect[i][1][2];
	nodeSize = collect[i][1][3];
	nodeColor = collect[i][1][4];
	nodeConnections = collect[i][1][5];
	
	sigInst.addNode(nodeId,{
      'x': nodeX,
      'y': nodeY,
      'label': nodeName,
      'size': nodeSize,
      'color': nodeColor
    });
	
	
	console.log("Node ID: "+nodeId+" and nodeName: "
	+nodeName+" and nodeColor: "+nodeColor+" and nodeConnections: "+nodeConnections);
	
  }
  
  for(i=0; i < collect.length; i++) {
	
	nodeId = collect[i][0];
	nodeConnections = collect[i][1][5];
	
	console.log(nodeId);
	
	console.log(nodeConnections);
	
	if((nodeConnections != null) && (nodeConnections != "")) {
		for(j=0; j < nodeConnections.length; j++) {
			console.log(nodeId+j);
			sigInst.addEdge(nodeId+j, nodeId,nodeConnections[j]);
			console.log("added edge");
		}
	}
	
	else {
		console.log("no connections");
	}
	
  }
 
/*
  for(i = 0; i < N; i++){
    sigInst.addNode('n'+i,{
      'x': Math.random(),
      'y': Math.random(),
      'label': 'Node '+i,
      'size': 10,
      'color': 'rgb('+Math.round(Math.random()*256)+','+
                      Math.round(Math.random()*256)+','+
                      Math.round(Math.random()*256)+')'
    });
  }
 
  for(i = 0; i < E; i++){
    sigInst.addEdge(i,'n'+2,'n'+3);
  }
  */
 
  // Draw the graph :
  sigInst.draw();
  
}
 
if (document.addEventListener) {
  document.addEventListener('DOMContentLoaded', init, false);
} else {
  window.onload = init;
}