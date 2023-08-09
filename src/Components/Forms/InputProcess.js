import React, { Component } from 'react'
import { Button } from 'react-bootstrap'
import BuildGraph from './BuildGraph';

export default class InputProcess extends Component {
  constructor(props){
    super(props);
    this.state={
      arr: [],
      CreateInputManuallyButtonFlag: 1,
      CreateGenerateRandomlyButtonFlag: 1,
      AddValueFlag: 0,
      GenerateRandomlyFlag: 0,
      BoomFlag: 0,
      val: 1,
      valIdx: -1,
      msg: [],
      nodes: [{id: 0, title:'Flag: 0\nCount: 0\nSuffix: 0\nChildrenFlag: 0000000000', label: "Root", shape: "box", color: {border: 'green'}, font: {color: 'green'}, nodeData: {flag: 0, cnt: 0, val: 0, childrenFlag: '0000000000'}}],
      edges: [],
      graph: {nodes:[{id: 0, title:'Flag: 0\nCount: 0\nSuffix: 0\nChildrenFlag: 0000000000', label: "Root", shape: "box", color: {border: 'green'}, font: {color: 'green'}, nodeData: {flag: 0, cnt: 0, val: 0, childrenFlag: '0000000000'}}],edges:[]}
    }
    this.SetCreateDynamicInputFlag=this.SetCreateDynamicInputFlag.bind(this);
    this.UpdVal=this.UpdVal.bind(this);
    this.AppendVal=this.AppendVal.bind(this);
    this.SetGenerateRandomlyFlag=this.SetGenerateRandomlyFlag.bind(this);
    this.Boom=this.Boom.bind(this);
    this.BoomCancel=this.BoomCancel.bind(this);
    this.UpdGraph=this.UpdGraph.bind(this);
  }

  

  BoomCancel(e){
    e.preventDefault();
    this.setState(
      {
        arr: [],
        CreateInputManuallyButtonFlag: 1,
        CreateGenerateRandomlyButtonFlag: 1,
        AddValueFlag: 0,
        GenerateRandomlyFlag: 0,
        BoomFlag: 0,
        val: 1,
        valIdx: -1,
        msg: [],
        nodes: [{id: 0, title:'Flag: 0\nCount: 0\nSuffix: 0\nChildrenFlag: 0000000000', label: "Root", shape: "box", color: {border: 'green'}, font: {color: 'green'}, nodeData: {flag: 0, cnt: 0, val: 0, childrenFlag: '0000000000'}}],
        edges: [],
        graph: {nodes:[{id: 0, title:'Flag: 0\nCount: 0\nSuffix: 0\nChildrenFlag: 0000000000', label: "Root", shape: "box", color: {border: 'green'}, font: {color: 'green'}, nodeData: {flag: 0, cnt: 0, val: 0, childrenFlag: '0000000000'}}],edges:[]}
      }
    )
  }

  UpdGraph(e){
    e.preventDefault();
    if(this.state.valIdx+1<this.state.arr.length){
      let val=this.state.arr[this.state.valIdx+1];
      let initialVal=val;
      let u=0;
      let tempCnt=1;
      var tempNodes=[];
      let tempMsg=[];
      var tempEdges=[...this.state.edges];
      let mxVal=0;
      let exp=1;

      for(let i=0;i<this.state.nodes.length;i++){
        let tempNode=this.state.nodes[i];
        if(tempNode.label!='Root') tempNodes.push({id: tempNode.id, title: tempNode.title, label: tempNode.label, shape: tempNode.shape, color: {border: 'darkblue'}, font: {color: 'darkblue'}, nodeData: tempNode.nodeData});
        else tempNodes.push({id: tempNode.id, title: tempNode.title, label: tempNode.label, shape: tempNode.shape, color: {border: 'green'}, font: {color: 'green'}, nodeData: tempNode.nodeData});
      }

      for(let i=0;i<this.state.arr.length;i++){
        if(this.state.arr[i]>mxVal) mxVal=this.state.arr[i];
      }

      let mxID=0;
      for(let i=0;i<tempEdges.length;i++){
        if(tempEdges[i].id>=mxID) mxID=tempEdges[i].id+1;
      }
      for(let i=0;i<this.state.edges.length;i++){
        if(tempEdges[i].color==='green'){
          let tempEdge=tempEdges[i];
          tempEdges.splice(i,1);
          tempEdges.push({from:tempEdge.from, to:tempEdge.to, id:mxID+1, label: tempEdge.label, value: 0, color: 'darkblue', font: {color: 'red'}});
          mxID++;
          i--;
        }
      }

      let len=0;
      while(mxVal!=0){
        mxVal=Math.floor(mxVal/10);
        exp*=10;
        len++;
      }
      let msg=(<div><b>Inserting '{val.toString()}' to the trie.</b></div>);
      tempMsg.push(msg);
      for(let i=exp/10;i>=1;i/=10){
        let flag=0;
        let x=Math.floor(val/i);

        let supStr='th';
        if(len===1) supStr='st';
        if(len===2) supStr='nd';
        if(len===3) supStr='rd';

        for(let j=0;j<tempNodes.length;j++){
          if(u===0) break;
          if(tempNodes[j].id===u){
            let temp=parseInt(tempNodes[j].label);
            temp%=(10*i);
            if(temp===val){
              let tempNode=tempNodes[j];
              tempNodes.splice(j,1);
              tempNode.nodeData.cnt+=tempCnt;
              let title='Flag: '+tempNode.nodeData.flag.toString()+'\nCount: '+tempNode.nodeData.cnt.toString()+'\nSuffix: '+tempNode.nodeData.val.toString()+'\nChildrenFlag: '+tempNode.nodeData.childrenFlag
              tempNodes.push({id: tempNode.id, title:title, label: tempNode.label, shape: tempNode.shape, color: {border: 'green'}, font: {color: 'green'}, nodeData: tempNode.nodeData});
              flag=2;
              let msg=(<div>The {len}<sup>{supStr}</sup> less significant digit <b>'{x.toString()}'</b> matches the nodeFlag. Also, the nodeSuffixes are same. So, increase the nodeCount by <b>'1'</b> and complete insertion.</div>);
              tempMsg.push(msg);
              break;
            }
            if(Math.floor(temp/i)===x && temp>val){
              let tempNode=tempNodes[j];
              tempNode.nodeData.val=val;
              val=temp;
              temp=initialVal;
              initialVal=parseInt(tempNodes[j].label);
              let tempNodeData=tempNode.nodeData;
              tempNodes.splice(j,1);
              tempNode.nodeData.cnt=tempCnt;
              tempCnt=tempNodeData.cnt;
              let title='Flag: '+tempNode.nodeData.flag.toString()+'\nCount: '+tempNode.nodeData.cnt.toString()+'\nSuffix: '+tempNode.nodeData.val.toString()+'\nChildrenFlag: '+tempNode.nodeData.childrenFlag
              tempNodes.push({id:u, title:title, label: temp.toString(), shape: "box", color: {border: 'green'}, font: {color: 'green'}, nodeData: tempNode.nodeData});
              let msg=(<div>The {len}<sup>{supStr}</sup> less significant digit <b>'{x.toString()}'</b> matches the nodeFlag. As nodeSuffix is greater than remaining suffix, swap the nodeData by newData and continue insertion.</div>);
              tempMsg.push(msg);
            }
            break;
          }
        }

        if(flag==2) break;
        
        val%=i;
        let v=10*u+x+1;
        
        for(let j=0;j<tempEdges.length;j++){
          if(tempEdges[j].from===u && tempEdges[j].to===v){
            tempEdges.splice(j,1);
            tempEdges.push({from:u, to:v, id:mxID+1, label: x.toString(), value: 0, color: 'green', font: {color: 'darkred'}});
            mxID++;
            flag=1;
            break;
          }
        }

        if(flag===0){
          for(let i=0;i<tempNodes.length;i++){
            if(tempNodes[i].id===u){
              let tempNode=tempNodes[i];
              tempNodes.splice(i,1);
              let idx=9-x
              let F=tempNode.nodeData.childrenFlag.substr(0,idx);
              if(idx!=9){
                let S=tempNode.nodeData.childrenFlag.substr(idx+1);
                tempNode.nodeData.childrenFlag=F+'1'+S;
              }
              else tempNode.nodeData.childrenFlag=F+'1';
              let title='Flag: '+tempNode.nodeData.flag.toString()+'\nCount: '+tempNode.nodeData.cnt.toString()+'\nSuffix: '+tempNode.nodeData.val.toString()+'\nChildrenFlag: '+tempNode.nodeData.childrenFlag
              tempNodes.push({id:u,title:title, label:tempNode.label, shape: "box", color: {border: 'green'}, font: {color: 'green'}, nodeData: tempNode.nodeData});
              let msg=(<div>There is no child of currentNode existed with the value <b>'{x.toString()}'</b>. So, create a node and update the nodeData by newData. Complete insertion.</div>)
              tempMsg.push(msg);
              break;
            }
          }
        }
        
        if(flag===0){
          let tempFlag=0;
          if(val!=0){
            tempFlag=Math.floor(val/(i/10))
          }
          let title='Flag: '+tempFlag.toString()+'\nCount: '+tempCnt.toString()+'\nSuffix: '+val.toString()+'\nChildrenFlag: 0000000000'
          tempNodes.push({id:v, title:title, label:initialVal.toString(), shape: "box", color: {border: 'green'}, font: {color: 'green'},nodeData: {flag:tempFlag, cnt:tempCnt,val:val, childrenFlag:'0000000000'}});
          tempEdges.push({from:u, to:v, id: mxID+1, label: x.toString(), value: 0, color: "green", font: {color: 'darkred'}});
          mxID++;
          break;
        }
        else{
          for(let i=0;i<tempNodes.length;i++){
            if(tempNodes[i].id===v){
              let tempNode=tempNodes[i];
              tempNodes.splice(i,1);
              tempNodes.push({id:v, title: tempNode.title, label:tempNode.label, shape: "box", color: {border: 'green'}, font: {color: 'green'}, nodeData: tempNode.nodeData});
              break;
            }
          }
          let msg=(<div>There is a child of currentNode existed with the value <b>'{x.toString()}'</b>. So, continue insertion going a level down.</div>)
          tempMsg.push(msg);
        }

        u=v;
        len--;
      }

      this.state.nodes=[...tempNodes];
      this.state.edges=[...tempEdges];

      this.setState(
        {
          nodes: [...this.state.nodes],
          edges: [...this.state.edges],
          graph: {nodes: [...this.state.nodes], edges: [...this.state.edges]},
          valIdx: this.state.valIdx+1,
          msg: [...tempMsg]
        }
      )
    }
    else{
      let tempArr=[...this.state.arr];
      var tempEdges=[];
      var tempNodes=[];
      let tempMsg=[];
      tempArr.sort();

      let msg=(<div style={{color: 'green'}}><b>Run DFS and get the sorted array</b></div>)
      tempMsg.push(msg);
      msg=(<div style={{color: 'green'}}>Visit each child node propagating <br></br><b>value = 10 * currentValue + childIndex</b></div>)
      tempMsg.push(msg);
      msg=(<div style={{color: 'green'}}>Explore the lowest created child first. Don't iterate on all possible children. Explore the created children only using <b>childrenFlag</b> and the equation <b>index -= index & (-index)</b></div>)
      tempMsg.push(msg);
      msg=(<div style={{color: 'green'}}>Before exploring a child greater that or equals to currentNodeFlag, insert the value of the currentNode to the sorted array.</div>)
      tempMsg.push(msg);
      msg=(<div style={{color: 'green'}}>After visiting all of the nodes, you'll get the sorted array.</div>)
      tempMsg.push(msg);
      msg=(<div style={{color: 'green'}}><b>Time Complexity: O(nlog<sub>k</sub>n)<br></br>Memory Complexity: O(n)</b></div>)
      tempMsg.push(msg);

      let mxID=0;
      for(let i=0;i<tempEdges.length;i++){
        if(tempEdges[i].id>=mxID) mxID=tempEdges[i].id+1;
      }
      for(let i=0;i<this.state.edges.length;i++){
        let tempEdge=this.state.edges[i];
        tempEdges.push({from:tempEdge.from, to:tempEdge.to, id:mxID+1, label: tempEdge.label, value: 0, color: 'green', font: {color: 'darkred'}});
        mxID++;
      }

      for(let i=0;i<this.state.nodes.length;i++){
        let tempNode=this.state.nodes[i];
        tempNodes.push({id: tempNode.id, title:tempNode.title, label: tempNode.label, shape: tempNode.shape, color: {border: 'green'}, font: {color: 'green'}, nodeData: tempNode.nodeData});
      }

      this.state.arr=[...tempArr];
      this.state.nodes=[...tempNodes];
      this.state.edges=[...tempEdges];

      this.setState(
        {
          arr: [...this.state.arr],
          edges: [...this.state.edges],
          nodes: [...this.state.nodes],
          graph: {nodes: [...this.state.nodes], edges: [...this.state.edges]},
          valIdx: this.state.valIdx+1,
          msg: [...tempMsg]
        }
      )
    }
  }

  Boom(e){
    e.preventDefault();
    if(this.state.GenerateRandomlyFlag===1 && this.state.val>0){
      this.setState(
        {
          arr: Array.from({length: this.state.val}, () => Math.floor(Math.random() * 100000)),
          CreateInputManuallyButtonFlag: 0,
          CreateGenerateRandomlyButtonFlag: 0,
          AddValueFlag: 0,
          GenerateRandomlyFlag: 0,
          BoomFlag: 1,
          val: 1,
          valIdx: -1
        }
      )
    }
    if(this.state.arr.length>=1){
      this.setState(
        {
          CreateInputManuallyButtonFlag: 0,
          CreateGenerateRandomlyButtonFlag: 0,
          AddValueFlag: 0,
          GenerateRandomlyFlag: 0,
          BoomFlag: 1,
          val: 1,
          valIdx: -1
        }
      )
    }
  }

  SetGenerateRandomlyFlag(e){
    e.preventDefault();
    this.setState(
      {
        arr: [],
        CreateGenerateRandomlyButtonFlag: 0,
        CreateInputManuallyButtonFlag: 1,
        AddValueFlag: 0,
        GenerateRandomlyFlag: 1,
        val: 1,
        valIdx: -1
      }
    )
  }

  SetCreateDynamicInputFlag(e){
    e.preventDefault();
    this.setState(
      {
        arr: [],
        AddValueFlag: 1,
        GenerateRandomlyFlag: 0,
        CreateInputManuallyButtonFlag: 0,
        CreateGenerateRandomlyButtonFlag: 1,
        val: 1,
        valIdx: -1
      }
    )
  }

  UpdVal(e){
    e.preventDefault();
    if(e.target.validity.valid){
      this.setState(
        {
          val: e.target.value
        }
      )
    }
  }

  AppendVal(e){
    e.preventDefault();
    if(this.state.arr.length<20){
      this.setState(
        {
          arr: [...this.state.arr,this.state.val],
          val: 1,
          valIdx: -1
        }
      )
    }
  }

  render() {
    const CreateInputManuallyButton=(<Button style={{width: 180, margin: 10}} variant="primary" onClick={this.SetCreateDynamicInputFlag}><b>Input Manually</b></Button>);
    const CreateGenerateRandomlyButton=(<Button style={{width: 180, margin: 10}} variant="success" onClick={this.SetGenerateRandomlyFlag}><b>Generate Randomly</b></Button>);
    const AddValueLabel=(<label style={{margin: 10, color:'darkblue'}}><b>Append Positive Integers</b></label>);
    const CreateAddValueInput=(<input style={{margin: 10, textAlign:'center', width:180, borderBlockColor:'blueviolet',borderRadius:5}} type='number' name='val' value={this.state.val} min={1} max={99999} pattern='[0-9]*' onChange={this.UpdVal}></input>);
    const CreateAddValueButton=(<Button style={{width: 180, margin: 10}} variant="primary" onClick={this.AppendVal}><b>Append</b></Button>);
    const NumberOfIntegersLabel=(<label style={{margin: 10, color:'darkblue'}}><b>Input the number of integers</b></label>);
    const NumberOfIntegers=(<input style={{margin: 10, textAlign:'center', width:180, borderBlockColor:'blueviolet',borderRadius:5}} type='number' name='val' value={this.state.val} min={1} max={20} pattern='[0-9]*' onChange={this.UpdVal}></input>);
    const CreateSubmitButton=(<Button style={{width: 180, margin: 10}} variant="success" onClick={this.Boom}><b>Submit</b></Button>)

    const Elements=[];
    if(this.state.AddValueFlag===1){
      Elements.push(AddValueLabel);
      Elements.push(CreateAddValueInput);
      Elements.push(CreateAddValueButton);
      Elements.push(CreateSubmitButton);
    }
    if(this.state.GenerateRandomlyFlag===1){
      Elements.push(NumberOfIntegersLabel);
      Elements.push(NumberOfIntegers);
      Elements.push(CreateSubmitButton);
    }
    if(this.state.CreateGenerateRandomlyButtonFlag===1) Elements.push(CreateGenerateRandomlyButton);
    if(this.state.CreateInputManuallyButtonFlag===1) Elements.push(CreateInputManuallyButton);
    
    const CreateForm=(<form style={{height: 350, width: 300, margin:'auto',marginTop: 70, padding:'40px', borderRadius:5, boxShadow:'1px 1px 5px 5px gray', backgroundColor:'white'}}>
                          {
                            Elements.map((item,idx) =>
                              <div key={idx}>
                                {item}
                              </div>
                            )
                          }
                      </form>);

    const ShowValues=(
      <div style={{margin: '20px 20px', borderRadius:5, boxShadow:'1px 1px 5px 5px gray', backgroundColor:'white'}}>
        {
          this.state.arr.map((value,idx) =>
            <p key={idx} style={{display:'inline-block', color:'darkblue'}}>
              <b>{value}&nbsp;&nbsp;</b>
            </p>
          )
        }
      </div>
    );


    const tempElements=[];
    if(this.state.BoomFlag===1){
      const ShowValuesModified=(
        <div style={{margin: '15px 20px 15px 20px', borderRadius:5, boxShadow:'1px 1px 5px 5px gray', backgroundColor:'white'}}>
          <div>
            {
              this.state.arr.map((value,idx) =>{
                  if(this.state.valIdx+1>this.state.arr.length){
                    return <p key={idx} style={{display:'inline-block', color:'green'}}>
                      <b>{value}&nbsp;&nbsp;</b>
                    </p>
                  }
                  else if(idx===this.state.valIdx){
                    return <p key={idx} style={{display:'inline-block', color:'red'}}>
                      <b>{value}&nbsp;&nbsp;</b>
                    </p>
                  }
                  else{
                    return <p key={idx} style={{display:'inline-block', color:'darkblue'}}>
                      <b>{value}&nbsp;&nbsp;</b>
                    </p>
                  }
                }
              )
            }
          </div>
          <div style={{display:'inline'}}>
            <Button style={{width: 90, margin: 5}} variant="success" onClick={this.UpdGraph}><b>Next</b></Button>
            <Button style={{width: 90, margin: 5}} variant="danger" onClick={this.BoomCancel}><b>Cancel</b></Button>
          </div>
        </div>
      );
      if(this.state.arr.length>=1) tempElements.push(ShowValuesModified);
      
      const CreateGraph=(<BuildGraph graph={this.state.graph} msg={this.state.msg}/>)
      tempElements.push(CreateGraph)

    }
    else{
      tempElements.push(CreateForm);
      if(this.state.arr.length>=1) tempElements.push(ShowValues);
    }


    return (
      <div>
        {
          tempElements.map((item,idx) =>
            <div key={idx}>
              {item}
            </div>
          )
        }
      </div>
    )
  }
}
