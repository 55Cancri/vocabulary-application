import React, {Component} from 'react'
import { connect } from 'react-redux'
import { TopicsListWord } from './TopicsListWord'
import { Link } from 'react-router-dom'

interface IState {
    words: any,
    topics: any,
    tags: any,
    activeTag: any
    // results: any
}

interface IProps {
    term: string,
    words?: any,
    topics?: any,
    tags?: any,
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
        activeTag: '',
        words: this.props.words,
        topics: this.props.topics,
        tags: this.props.tags,
        resultElements: []
    }
    
    //@ts-ignore
    componentDidMount = () => {
        // console.log(this.state.tags)
    }

    //@ts-ignore
    componentWillReceiveProps = (props, nextProps) => {
        // console.log('Input so far: ', props.term)
        const wait = async () => {
            await this.setState({
                
                searchTerm: props.term 
                
            } as any)
            keywordFound(this.props.term)
            console.log(keywordFound(this.props.term))
            // this.state.resultPool = props.words.filter(wordList => wordList.word === this.state.searchTerm)
            // console.log('Words in state: ', this.state.words)
        }
        wait();
        

        // this.setState(prevState => ({
        //     results: resultPool
        // }))
        
    }

    keyFilter = (term) => {
        console.log('Stepped into keyFilter')
        let keyword = term.substring(0, term.indexOf(':'))
        let words = this.props.words
        let tags = this.props.tags
        let termContents = term.substring((term.indexOf(':')+2),term.length)
        let termItems = termContents.split(',')
        let allResults = []
        let finalResults = []
        // console.log(keyword)
        // console.log(words)
        // console.log('Tags to search: ', termItems)
        // console.log('Results: ', results)
        switch (keyword){
            case 'tags':
                // Some logic
                for (let t of termItems) {
                    // console.log(words[0].tags)
                    // console.log(words.filter(word => word.tags.includes(t)))
                    allResults.push(words.filter(word => word.tags.includes(t)))
                }
                console.log(allResults)
                for (let i = 0; i < allResults.length; i++) {
                    for (let j of allResults[i]) {
                        if (!finalResults.includes(j)) {
                            finalResults.push(j)
                        }
                    }
                }
                return finalResults
                // console.log(finalResults)
                // To remove duplicate words
                // for(let i=0; i<results.length; ++i) {
                //     for(let j=i+1; j<results.length; ++j) {
                //         if(results[i] === results[j])
                //             results.splice(j--, 1);
                //     }
                // }
            case 'tagSearch':
                
                    // console.log(words[0].tags)
                    // console.log(words.filter(word => word.tags.includes(t)))
                return tags.filter(tags.toLowerCase.includes(termContents.toLowerCase))
                
                // console.log(allResults)
                // for (let i = 0; i < allResults.length; i++) {
                //     for (let j of allResults[i]) {
                //         if (!finalResults.includes(j)) {
                //             finalResults.push(j)
                //         }
                //     }
                // }
                // return finalResults
            case 'topic':
                // More logic
                return words
            default:
                // Do nothing
                return words
        }
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
                    {
                        keywordFound(this.props.term) ?
                        this.props.words !== undefined && this.keyFilter(this.props.term).map(word =>
                            <div key={word.uid} >
                                <Link to={`/word/${word.uid}`}>
                                    <p>{word.word}</p>
                                </Link>
                                {/* <TopicsListWord key={word.uid} word={word} /> */}
                            </div>
                        )
                        // ||
                        // this.props.term.includes('tagSearch:') && this.props.tags.filter(tag => this.props.term.substring(11, this.props.term.length).toLowerCase().includes(tag.toLowerCase) || !this.props.term.substring(11, this.props.term.length)).map( tag =>
                        //     <div key={tag} >
                        //         <p>{tag}</p>
                        //     </div>
                        // ) 
                        :
                        this.props.words !== undefined && this.props.words.filter(matchFound(this.props.term)).map(word =>
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
      topics: state.lexica.topics,
      tags: state.lexica.tags,
      activeTag: state.lexica.activeTag
    //   results: state.lexica.results
    }
  }

export default connect(mapStateToProps, null)(SearchResults)