import React from 'react';
import ReactDOM from 'react-dom';

import * as d3 from 'd3'

/**
 * Bar chart component
 *  
 **/
class BarChart extends React.Component {

    constructor(props){
        super(props);
        this.state = {
            colorScale : ["#8e91ea","#58bb70","#d692dc"],
        }
        

    }


    componentDidMount() {
        this.svg = ReactDOM.findDOMNode(this);
        this.renderObject();
      }
    
    componentDidUpdate() {
    const {
        w,
        h,
    } = this.props;
    if(w !== 0 && h !== 0) {
        this.renderObject();
    }}

    renderObject() {
        const { w, h, d, yaxis_label, xaxis_label, bars } = this.props;

        let data = d;
        const gap = 1.1;
        const margin = { top: 10, right: 30, bottom: 30, left: 40 };
        const width = (w - margin.left) - margin.right;
        const height = (h - margin.top) - margin.bottom;

    
        let subgroups = bars;
        let groups = d3.map(data, (d) => { 
            return(d.dato)
        }).keys()

        
        this.svg.innerHTML = '';

        const svg = d3.select(this.svg).append("g")
            .attr("width", (width))
            .attr("height", (height))

        this.g = svg.append("g")
            .attr("class", "everything");

        let x = d3.scaleBand()
            .domain(groups)
            .range([ 100, width])
            .padding(0.2);
        let xaxis = this.g.append("g")
            .attr("transform", "translate(0," + (height - margin.bottom) + ")")
            .style("color", "black")

        let y = d3.scaleLinear()
            .range([ height - margin.bottom, margin.top + 10]);
        let yaxis = this.g.append("g")
            .attr("class", "y-axis")
            .attr("transform", "translate(" + (width - (width-100)) + ", -5)")
            .style("color", "black")

        
        const color = d3.scaleOrdinal()
            .domain(subgroups)
            .range(this.state.colorScale)


        this.g.append("text")
            .attr("text-anchor", "end")
            .attr("x", (width/2) + (margin.left + 10))
            .attr("y", height + margin.bottom)
            .text(xaxis_label)
            .style("fill", "#357061");


        this.g.append("text")
            .attr("text-anchor", "end")
            .attr("transform", "rotate(-90)")
            .attr("y", margin.left + 15)
            .attr("x", -((height/2) - margin.bottom))
            .text(yaxis_label)
            .style("fill", "#357061");

        const loadData = () => {

            let xInnerGroups = d3.scaleBand()
                .domain(subgroups)
                .range([0, x.bandwidth()])
                .padding([0.06])
           
            xaxis.call(d3.axisBottom(x))
                .selectAll("text")
                .style("text-anchor", "end")
                .attr("dx", "-.8em")
                .attr("dy", ".15em")
                .attr("transform", () => {
                    return "rotate(-30)";
            })
            
            y.domain([0, (d3.max(data, (d) => { 
                return d[subgroups[1]] 
            })*gap)])
            yaxis.transition().duration(1000).call(d3.axisLeft(y))



            
            let allrect = this.g.append("g")
                .selectAll("g")
                .data(data)
                .enter().append("g")
                    .attr("transform", function(d) { return "translate(" + x(d.dato) + ",0)"; })
                    .selectAll("rect").data((d) => {
                        return subgroups.map((key) => {
                            let obj = {key: key, value: d[key]}
                            return obj;
                        })
                    })

            allrect.enter()
                   .append("rect")
                   .transition()
                   .duration(1000)
                        .attr("x", (d) =>{ return xInnerGroups(d.key); })
                        .attr("y", (d) => { return y(d.value) })
                        .attr("width", () => { return xInnerGroups.bandwidth() })
                        .attr("height", (d) => { return ((height - y(d.value)) - margin.bottom) })
                        .attr("fill", (d) => {
                            return color(d.key)
                        })
                        .attr("opacity", "0.6")
            allrect.exit()
                    .remove()
        }
        
        const zoomed = () => {
           this. g.attr("transform", d3.event.transform);
        }
        loadData(data)

        const zoomhandler = d3.zoom().on("zoom", zoomed)
        zoomhandler(svg) 



        const renderLegend = (w, h, bars) => {
  
            const legendWidth = 40
            const offset = 50;
            const static_gap = 18;
            const static_size = 8;

            this.g.selectAll('.dots')
                .data(bars)
                .enter()
                .append("circle")
                    .attr("cx", (w - (legendWidth + offset)))
                    .attr("cy", function(d, index){ return 7 + ((index * static_gap) + (static_gap/2))})
                    .attr("r", static_size)
                    .style("fill", function(d){ return color(d)})

            this.g.selectAll('.labels')
                .data(bars)
                .enter()
                .append("text")
                    .attr("x", () => { return (w - (legendWidth + offset)) + static_gap*1.2 })
                    .attr("y", (d, index) => { return (10 + ((index * static_gap) + (static_gap/2))) })
                    .attr("alignment-baseline","middle")
                    .style("fill", (d) => { return color(d)})
                    .text((d) => {
                        return d
                    })
                    .style("font-size", "14px")

          }
      
         renderLegend(w, h, bars)

       
    }


    render() {
        const { w, h } = this.props;

        return (
          <svg width={w} height={h} id="barchartsvg" />
        )
      }
}

export default BarChart;
