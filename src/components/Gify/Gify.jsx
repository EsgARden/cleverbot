import React from 'react';
import axios from 'axios';

let API_KEY = 'yNrw7gF4OvDhHxRNGTHORUmE7z35dA50';
const gify = axios.create({
    baseUrl: 'https://api.giphy.com/v1/gifs/',
    timeout: 15000,
    params: { key: API_KEY }
})
export class Gify extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            input: '',
            defaultGif: '',
            gif: [],
        }
    }

    handleInput = (e) => {
        const target = e.target;
        const value = target.value;
        const name = target.name;
        this.setState({ [name]: value });
    }

    searchGif = (e) => {
        e.preventDefault();
        // gify.get('translate', {params:{
        //     input: this.state.input}
        // }).then(res => console.log(res.data));
        fetch('https://api.giphy.com/v1/gifs/translate?api_key=' + API_KEY + '&s=' + this.state.input,
            {
                method: 'GET',
            }).then(results => {
                results.json()
                    .then((data) => {
                        this.state.gif.push(data.data.embed_url);
                    })
            }).then(() => {
                this.setState({ input: '' })
            })
    }

    // componentWillMount() {
    //     fetch('https://api.giphy.com/v1/gifs/translate?api_key=' + API_KEY + '&s=tongue',
    //         {
    //             method: 'GET',
    //         }).then(results => {
    //             results.json()
    //                 .then((data) => {
    //                     this.setState({ defaultGif: data.data.embed_url })
    //                 })
    //         });
    // }
    render() {
        let component = null;

        if (this.state.gif.length > 0) {
            component = (
                this.state.gif.map((i, index) => {
                    return <div className="chat-gifs" key={index}>
                        <iframe src={i} width="480" height="320" frameBorder="0" className="" allowFullScreen key={index}></iframe>
                    </div>
                }))
        } else {
            component = (<iframe src={this.state.defaultGif} width="480" height="320" frameBorder="0" className="" allowFullScreen></iframe>)
        }
        return (
            <div className="phone">
                <header><span className="left">Messages</span><h2>Frank the plant</h2><span className="right">Contact</span></header>
                <div className="messages-wrapper">
                    {component}
                </div>
                <form action="" onSubmit={this.talkFrank}>
                    <input type="text" onChange={this.handleInput} name="input" placeholder="iMessage" value={this.state.input} />
                </form>
            </div>
        )
    }
}
{/* <div>
    <div className="">
        <div className="gif-view">
            {component}
        </div>
        <form action="" onSubmit={this.searchGif}>
            <input type="text" onChange={this.handleInput} name="input" placeholder="Let chat!"  value={this.state.input}/>
        </form>
    </div>
</div> */}