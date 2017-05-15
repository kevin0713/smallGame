/**
 * Created by Administrator on 2017/5/12/012.
 */

import React,{Component} from 'react';
import './index.css';
function Square({item,value,handleClick}) {
    return(
        <button className="square" onClick={()=>{handleClick(item)}}>{value}</button>
    )
}
function Board({square,handleClick,xIsNext}) {
    const status=`Next player:${xIsNext}`;
    return(
        <div>
            <div>{status}</div>
            <div>
               <div className="board-row">
                   <Square key="0" item="0" value={square[0]} handleClick={handleClick}/>
                   <Square key="1" item="1" value={square[1]} handleClick={handleClick}/>
                   <Square key="2" item="2" value={square[2]} handleClick={handleClick}/>
               </div>
                <div className="board-row">
                    <Square key="3" item="3" value={square[3]} handleClick={handleClick}/>
                    <Square key="4" item="4" value={square[4]} handleClick={handleClick}/>
                    <Square key="5" item="5" value={square[5]} handleClick={handleClick}/>
                </div>
                <div className="board-row">
                    <Square key="6" item="6" value={square[6]} handleClick={handleClick}/>
                    <Square key="7" item="7" value={square[7]} handleClick={handleClick}/>
                    <Square key="8" item="8" value={square[8]} handleClick={handleClick}/>
                </div>
           </div>

        </div>
    )
}
class Game extends Component{
    constructor(props) {
        super(props)
        this.state = {
           history:[
               {square: Array(9).fill(null)}
           ],
            xIsNext: true,
            stepNumber:0,
        }
        this.handleClick = this.handleClick.bind(this);
        this.jumpTo=this.jumpTo.bind(this);
        this.calculateWinner=this.calculateWinner.bind(this);
    }
    handleClick(i) {
        const history =this.state.history.slice(0,this.state.stepNumber+1);
        const current =history[history.length-1];
        const square=current.square.slice();
        if (this.calculateWinner(square) || square[i]) {
            return;
        }
        square[i] =this.state.xIsNext?'X':'O';
        this.setState({
            history: history.concat([{
                square: square
            }]),
            stepNumber: history.length,
            xIsNext:!this.state.xIsNext,
        });
    }
    jumpTo(step) {
        this.setState({
            stepNumber: step,
            xIsNext: (step % 2) ? false : true,
        });
    }
    calculateWinner(squares) {
        const line = [
            [0, 1, 2],
            [3, 4, 5],
            [6, 7, 8],
            [0, 3, 6],
            [1, 4, 7],
            [2, 5, 8],
            [0, 4, 8],
            [2, 4, 6],
        ];
        for(let i=0;i<line.length;i++){
            const [a,b,c]=line[i];
            if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
                return squares[a];
            }
        }
        return null;
    }

    render(){
        const history=this.state.history.slice(0,this.state.stepNumber+1)
        const current=history[history.length-1];
        const winner=this.calculateWinner(current.square);
        let status;
        if(winner){
            status=`Winner:${winner}`
        }else {
            status=`Next player:${this.state.xIsNext?'X':'O'}`
        }

         const moves=history.map(function (s,m) {
             const desc=m?`Move#${m}`:'Game Start ';
             return (<li key={m}>
                 <a  href="#" onClick={()=>this.jumpTo(m)}>{desc}</a>
             </li>)
         }.bind(this))
        return (
            <div className="game">
                <div className="game-board">
                    <Board square={current.square} xIsNext={this.state.xIsNext?'X':'O'}handleClick={this.handleClick}/>
                </div>
                <div className="game-info">
                    <div>{status}</div>
                    <ol>{moves}</ol>
                </div>
            </div>
        )
    }
}

export default Game