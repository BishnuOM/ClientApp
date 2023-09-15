import React ,{ Component } from 'react';
import { Line } from "react-chartjs-2";
import Service from '../../Service/Service';


export class TrainingChart extends Component {

  constructor(props){
    super(props);
    this.state={
      data: {
        "labels": ["Saturday","Sunday","Monday","Tuesday","Wednesday","Thursday","Friday"],
      "datasets": [
        {
          "label": "This Week",
          "data": [0,0,0,0,0,1,0],
          "fill": false,
          "backgroundColor": "#742774",
          "borderColor": "#742774"
        },
        {
          "label": "Last Week",
          "data": [0,0,0,1,0,0,0],
          "fill": false,
          "backgroundColor": "rgba(75,192,192,0.2)",
          "borderColor": "rgba(75,192,192,1)"
        },
      
      ]
    },
    options: {
      plugins: {
        legend: {
          position: 'top',
          labels: {
            usePointStyle: true,
            pointStyle: 'circle'
          }
        }
      }
    }
  
    }
 }

 componentDidMount(){
  const data=JSON.parse(localStorage.getItem("login_data"));
   this.setState({
        AccessToken:data.token,
        userid:data.id,
        trainingdata:this.props.trainingsdata,
      }, this.GetChartData)
 
 
  }
 
  componentWillReceiveProps(props) {
    
       this.setState({
        trainingdata: props.trainingsdata
       },this.GetChartData);
     
    
 }
 
 
 
 
 
  GetChartData(){
    var self = this;
    var mentor_data= {
     days: this.state.trainingdata,
     chartType: "Training",
     
     
 
 }
   Service.GetChartData(self,mentor_data).then((response) => {
      const chartdata= response
     
        self.setState({
         data : {
           labels: chartdata.labels,
           datasets: 
           [
            {
              label:chartdata.datasets[1].label,
              data:chartdata.datasets[1].data,
              fill: chartdata.datasets[1].fill,
              backgroundColor: chartdata.datasets[1].backgroundColor,
              borderColor: chartdata.datasets[1].borderColor
            },
             {
               label:chartdata.datasets[0].label,
               data:chartdata.datasets[0].data,
               fill: chartdata.datasets[0].fill,
               backgroundColor: chartdata.datasets[0].backgroundColor,
               borderColor: chartdata.datasets[0].borderColor
             }
           
           ]
         },
         options: {
          plugins: {
            legend: {
              position: 'top',
              labels: {
                usePointStyle: true,
                pointStyle: 'circle'
              }
            }
          }
        }
        })
   });
 

   
  }
  
  render () {
    return (
      <>
        <Line data={this.state.data} options={this.state.options} />
      </>
       
    );
  }
}
