import React from 'react'
import Graph from 'react-graph-vis'
import 'vis-network/styles/vis-network.css'

function BuildGraph(props) {

  var options = {
    nodes: {
        borderWidth: 2,
        size: 100,
        color: {
            background: "white"
        },
        font: {
            multi: "true",
            bold: "50px"
        },
        shadow: {
            enabled: true,
        },
    },
    edges: {
        length: 70,
        font: {
          color: "red",
          multi: "true",
          bold: "50px"
      },
      scaling: {
        min: 3,
        max: 3,
        label: {
          min: 16,
          max: 16
        }
      },
      arrows: {
        to: {
          enabled: true,
          scaleFactor: 0
        }
      }
    },
    height: "500px",
  }

  return (
    <div style={{margin: '10px 20px', textAlign: 'left'}}>
      <div style={{margin: '0px 8px 0px 0px', display: 'inline-block',height:'500px', width: '70%', borderRadius:5, boxShadow:'1px 1px 5px 5px gray', backgroundColor:'white'}}>
        <Graph graph={props.graph} options={options}/>
      </div>
      <div style={{margin: '0px 0px 0px 8px', position: 'fixed', display: 'inline-block',height:'500px', width: '28%', borderRadius:5, boxShadow:'1px 1px 5px 5px gray', backgroundColor:'white'}}>
        {
          props.msg.map((msg,idx)=>
            <p key={idx} style={{color:'darkblue', marginLeft: '10px', marginRight: '10px'}}>
              {msg}
            </p>
          )
        }
      </div>
    </div>
  )
}

export default BuildGraph