import React, { Component } from 'react';
import config from '../config'
// get a reference to firebase
const firebase = require('firebase');
const axios = require('axios');
const d3 = require('d3');

var data = {
    nodes: [],
    links: []
}

export class Graph extends Component {

    // constructor(props){
    //     super(props)
    //     this.state = {
    //         loaded: false
    //     }
    // }

    componentWillMount() {
        
        // this.setState({
        //     loaded: true
        // })
        // console.log(data.nodes)
        // console.log(data.links)
    }

    async componentDidMount(){
        if (!firebase.apps.length) {
            firebase.initializeApp(config)
        }

        const newNodes = []
        const newLinks = []
        var graphVizref = firebase.database().ref('graphViz')
        graphVizref.on('value', snapshot => {
            let items = snapshot.val();
            for (let item in items) {
                
                // add movie to node list
                let n = {
                    group: 1, // movies
                    value: items[item].moviedata.Title,
                    imgSrc: items[item].moviedata.Poster
                }
                newNodes.push(n)

                // add actor to node list if it doeesn't exist
                let movieIndex = newNodes.length - 1;
                let actors = items[item].moviedata.Actors.split(', ');
                actors.map((actor, index) => {
                    let toAdd = true
                    
                    newNodes.map((a, index2) => {
                        if(a.group == 2 && a.value == actor){
                            toAdd = false
                            let l = {
                                source: movieIndex,
                                target: index2,
                                value: 1
                            }
                            newLinks.push(l)
                            // console.log(index2)
                        }
                    })

                    if(toAdd) {
                        n = {
                            group: 2, // actors
                            value: actor
                        }
                        newNodes.push(n)
                        // link actor to newly added movie
                        let l = {
                            source: movieIndex,
                            target: newNodes.length - 1,
                            value: 1
                        }
                        newLinks.push(l)
                        // console.log(actor);
                    }
                })
            }
        })

        data.nodes = newNodes;
        data.links = newLinks;

        console.log(data.nodes)
        console.log(data.links)
        
        const elem = document.getElementById('mysvg');
        if(data.nodes[0] != null){
            elem.appendChild(this.chart(data.nodes, data.links));
        }
    }


    chart(nodes, links) {
        const width = 1000;
        const height = 800;

        // nodes.map((d, index) => console.log(d))
        // links.map((d, index) => console.log(d))
        const obj_links = links.map((d, index) => Object.create(d))
        const obj_nodes = nodes.map((d, index) => Object.create(d))
        console.log(obj_links)
        console.log(obj_nodes)

        const svg = d3.create('svg')
            .attr('viewBox', [0, 0, width, height]);

        const link = svg.append('g')
            .attr('stroke', '#999')
            .attr('stroke-opacity', 0.6)
            .selectAll('line')
            .data(obj_links)
            .join('line')
            .attr('stroke-width', d => Math.sqrt(d.value))
            .attr('path-length', 5)


        const radius = (node) => {
            if (node.group == 1)
                return 30;
            return 14;
        }

        const simulation = d3.forceSimulation(obj_nodes)
            .force('link', d3.forceLink().links(links).id(d => { return d.index; }).distance(200))
            .force('charge', d3.forceManyBody())
            .force('center', d3.forceCenter(width / 2, height / 2));
            // center of mass


        // add def - needed to use fill with image
        const defs = svg.append('defs')
        
        // add pattern for each movie
        data.nodes.map((d, index) => {

            if(d.group == 1) { // is a movie
                defs.append('pattern')
                    .attr('id', 'movie-poster'+ index)
                    .attr('width', 1)
                    .attr('height', 1)
                    .append("image")
                    .attr("xlink:href", d.imgSrc)
                    .attr('width', 60)
                    .attr('height', 100)
                    .attr('x', 0)
                    .attr('y', -30)
            }
        })

        // create circles for nodes
        const node = svg.append('g')
            .attr('id', 'nodes')
            .attr('stroke', '#fff')
            .attr('stroke-width', 1.5)
            .selectAll('circle')
            .data(obj_nodes)
            .join('circle')
            .attr('r', radius)
            .style('fill', function(d) {
                if (d.group == 1) {
                    return 'url(#movie-poster'+ d.index +')';
                }
                return d3.color('pink')
            })
            .on('mouseover', function(d) {
                if(d.group == 2) { // for showing actors onhover
                    // return d.value
                    // alert(d.value)
                    console.log(d.value)
                    // console.log(d3.transform(d3.select(this.parentNode).attr("transform")).translate)
                    svg.append('text')
                        .attr('stroke', 'grey')
                        .text(d.value)
                        .attr('x', d3.select(this).attr("cx") + 10)
                        .attr('y', d3.select(this).attr("cy") + 10)
                }
            })
            .on('mouseout', function(d) {
                if(d.group == 2) {
                    console.log(d.value)
                    console.log("left!!!")
                    d3.select('text').remove();
                }
            })
            .call(this.drag(simulation))
        

        
        simulation.on('tick', () => {
            link
                .attr('x1', d => d.source.x)
                .attr('y1', d => d.source.y)
                .attr('x2', d => d.target.x)
                .attr('y2', d => d.target.y)
            node
                .attr('cx', d => d.x)
                .attr('cy', d => d.y)
            
        });

        return svg.node();
    }


    drag = (simulation) => {
        
        function dragStarted(d) {
            // when we drag something, it may fire multiple times,
            // but we only want it to fire once, so we do this check
            // alphaTarget - how much effect the drag should have
            if (!d3.event.active) simulation.alphaTarget(0.3).restart();
            // change position of node to position of cursor
            d.fx = d.x;
            d.fy = d.y;
        }

        function dragged(d) {
            // set to position of the event/simulation
            d.fx = d3.event.x;
            d.fy = d3.event.y;
        }

        function dragEnded(d) {
            if(!d3.event.active) simulation.alphaTarget(0);
            // undo the force you applied to the node previously
            // d.fx = null;
            // d.fy = null;
        }

        return d3.drag()
            .on('start', dragStarted)
            .on('drag', dragged)
            .on('end', dragEnded)
    }


    render() {

        return (
            <div id='mysvg'>
            </div>
        );
    }
}
export default Graph;