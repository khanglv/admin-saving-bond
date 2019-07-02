import React, {Component} from 'react';
import {OutTable, ExcelRenderer} from 'react-excel-renderer';

export default class Test extends Component{
    constructor(props){
        super(props);
        this.state = {
            cols: null,
            rows: null,
            dataLoaded: false,
        }
    }

    fileHandler = (event) => {
        let fileObj = event.target.files[0];
    
        //just pass the fileObj as parameter
        ExcelRenderer(fileObj, (err, resp) => {
          if(err){
            console.log(err);            
          }
          else{
            this.setState({
                dataLoaded: true,
              cols: resp.cols,
              rows: resp.rows
            });
            console.log(resp);
            console.log('fileObj ' + JSON.stringify(fileObj));
          }
        });               
    
      }
    render(){
        return(
            <div>

                <input type="file" onChange={this.fileHandler.bind(this)} style={{"padding":"10px"}} />
            {this.state.dataLoaded &&<div className="p-top10">
                    <OutTable data={this.state.rows} columns={this.state.cols} tableClassName="ExcelTable2007" tableHeaderRowClass="heading" />
                </div>}
                
            </div>    
        );
    }
}