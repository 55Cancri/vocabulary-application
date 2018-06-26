import React, {Component} from 'react'
import { connect } from 'react-redux'
import { TopicsListWord } from './TopicsListWord'
import { Link } from 'react-router-dom'

interface IState {
    words: any,
    // results: any
}

interface IProps {
    term: string,
    words?: any,
    inputState: any
}

const matchFound = term => {
    return x => {
        return x.word.toLowerCase().includes(term.toLowerCase()) || !term
    }
}

const keywordFound = term => {
    return (
        term.includes(':') &&
            (term.substring(0, term.indexOf(':')) === 'tags' ||
            term.substring(0, term.indexOf(':')) === 'topic')
    )
}

export class SearchResults extends Component<IProps, IState> {
    
    state = {
        searchTerm: '',
        // resultPool: this.state.words,
        words: this.props.words,
        resultElements: []
    }
    
    //@ts-ignore
    componentDidMount = () => {
        // console.log(this.state.words)
    }

    //@ts-ignore
    componentWillReceiveProps = (props, nextProps) => {
        // console.log('Input so far: ', props.term)
        const wait = async () => {
            await this.setState({
                
                searchTerm: props.term 
                
            } as any)
            console.log(keywordFound(this.state.searchTerm))
            // this.state.resultPool = props.words.filter(wordList => wordList.word === this.state.searchTerm)
            // console.log('Words in state: ', this.state.words)
        }
        wait();
        

        // this.setState(prevState => ({
        //     results: resultPool
        // }))
        
    }

    // buildResults = () => {
    //     this.state.resultPool.forEach(e => {
    //         console.log('Result object', e)
    //         this.state.resultElements.push(
    //             <div>
    //                 <p>e.word</p>
    //             </div>
    //         )
    //     })
    //     return this.state.resultElements
    // }

    render() {
        return(
            <section className={this.props.inputState? 'section focus' : 'section blur'} >
                <div className="search-results-bg">
                    
                </div>
                <div className='search-results'
                >
                    <h1>Results</h1>
                    {this.props.words !== undefined && this.props.words.filter(matchFound(this.props.term)).map(word =>
                        <div key={word.uid} >
                            <Link to={`/word/${word.uid}`}>
                                <p>{word.word}</p>
                            </Link>
                            {/* <TopicsListWord key={word.uid} word={word} /> */}
                        </div>
                    )}
                </div>
                
            </section>
        )
    }
}

const mapStateToProps = (state): IState => {
    return {
      words: state.lexica.words,
    //   results: state.lexica.results
    }
  }

export default connect(mapStateToProps, null)(SearchResults)