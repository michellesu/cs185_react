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
        const width = 800;
        const height = 600;

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

        const color = (node) => {
            if (node.group == 1) // it's a movie
                return d3.color('slateblue')
                // return 'url(#image)'
            return d3.color('pink')
        }

        const radius = (node) => {
            if (node.group == 1)
                return 30;
            return 10;
        }

        const simulation = d3.forceSimulation(obj_nodes)
            .force('link', d3.forceLink().links(links).id(d => { return d.index; }).distance(200))
            .force('charge', d3.forceManyBody())
            .force('center', d3.forceCenter(width / 2, height / 2));
            // center of mass
        
        // let defs =  svg.append('defs')
        // let pattern = defs.append('pattern')
        //     .attr('height', 1)
        //     .attr('width', 1)
        //     .attr('patternUnits', 'userSpaceOnUse')
        
        // let img = pattern.append('image')
        //     .data(obj_nodes)    
        //     .attr('xlink:href', d => d.imgSrc)

        const node = svg.append('g')
            .attr('stroke', '#fff')
            .attr('stroke-width', 1.5)
            .selectAll('circle')
            .data(obj_nodes)
            .join('circle')
            .attr('r', radius)
            .attr('fill', color)
            .call(this.drag(simulation))
            .attr('x', width/2)
            .attr('y', height/2)
            .attr('width', 50)
            .attr('height', 50)
            // .on('mouseover', 
            //     function(e) {
            //         e.currentTarget
            //     }
            //     d => svg.append('g')
            //     .attr('stroke', 'grey')
            //     .selectAll('text')
            //     .attr('fill', color)
            //     .call(this.drag(simulation))
            //     .text(d.value))
        
            // node[0].map((d, index) => {
            //     console.log(d)
            // })
            // node[0].addEventListener('click', function(e) {
            //     e.currentTarget.setAttribute('fill', 'black')
            // })
            // console.log(node)
            // const showText = (d2) => {
            //     if(d2.group == 2) {
            //         for i in node((d, index) => {
                        
            //         }) 
            //     }
            //     return 0
            // }

        const node2 = svg.append('g')
            .attr('stroke', 'grey')
            .selectAll('text')
            .data(obj_nodes)
            .join('text')
            .attr('r', radius)
            .attr('fill', color)
            .call(this.drag(simulation))
            .attr('x', width/2)
            .attr('y', height/2)
            .attr('width', 50)
            .attr('height', 50)
            .text(d => d.value)
            // .attr('opacity', showText)
        
            
        
        const node3 = svg.append('g')
            .attr('stroke', 'grey')
            .selectAll('image')
            .data(obj_nodes)
            .join('image')
            .attr('xlink:href', d => d.imgSrc)
            .attr('fill', color)
            .call(this.drag(simulation))
            .attr('x', width/2)
            .attr('y', height/2)
            .attr('width', 50)
            .attr('height', 50)

        // function mouseout(d) { node.style('opacity', 0); }
        // function mouseover(d) { node.style('opacity', 1); }

        // console.log(node)
        // const images = node.append('image')
        //     .attr('xlink:href', function(d) { return d.imgSrc} )
        //     .attr('height', 50)
        //     .attr('width', 50)
        
        // const text = node.append('text')
        //     .attr('class', 'nodetext')
        //     .text(function(d) { return d.value} )

        // const images = node.append('image')
        //     .attr('xlink:href', img)
        //     .attr("height", 50)
        //     .attr("width", 50);
            // .text(function (d){
            //     if(d.group == 2){
            //         return d.value
            //     }
            // })
            // .on('mouseout', function(d){
            //     node.style('opacity', 0);
            // })
            // .attr('fill', d3.color('steelblue'))
            // .attr('r', 20)

        
        simulation.on('tick', () => {
            link
                .attr('x1', d => d.source.x)
                .attr('y1', d => d.source.y)
                .attr('x2', d => d.target.x)
                .attr('y2', d => d.target.y)
            node
                .attr('cx', d => d.x)
                .attr('cy', d => d.y)
            // node2
            //     .attr('cx', d => d.x)
            //     .attr('cy', d => d.y)
            node3
                .attr('cx', d => d.x)
                .attr('cy', d => d.y)
        });

        // return svg.images();
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
            d.fx = null;
            d.fy = null;
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