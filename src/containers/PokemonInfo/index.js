import React, {Component} from 'react'
import PokemonInfo from './components/PokemonInfo'
import { connect } from 'react-redux'
import {typeToColor} from '../../utils/settings'
import {getSinglePokemon,getPokemonSpecies,getEvolutionChain} from '../../actions/pokemonsActions'
import {getEvolutionArray} from '../../reducers/pokemonsReducer'

class PokemonInfoContainer extends Component {
    constructor(props){
        super(props)
        this.state={
            evolutionChain: [],
            fetchingEvolutionChain: true,
            evolutionChainId: -1,
            pokemonChosen: -1,
            open: false
        }
    }
    componentWillReceiveProps(nextProps){
        if (nextProps.openPokemonInfo && !this.props.openPokemonInfo){
            // we refresh it
            this.props.getSinglePokemon(nextProps.pokemonChosen)
            this.setState({
                open: true,
                pokemonChosen: nextProps.pokemonChosen
            })
        }
        if(this.state.open){ // only do the fetching if open
            if(nextProps.ajaxSinglePokemon.fetched && !this.props.ajaxSinglePokemon.fetched){
                // we just got the info of that pokemon
                if (nextProps.singlePokemonFullInfo.id == this.state.pokemonChosen && // filter possible previous requests
                    nextProps.ajaxSinglePokemon.success){
                    this.props.getPokemonSpecies(nextProps.singlePokemonFullInfo.species.url)
                }
            }else if(nextProps.ajaxPokemonSpecies.fetched && !this.props.ajaxPokemonSpecies.fetched){
                if (nextProps.ajaxPokemonSpecies.success){
                    let evolutionChainId = nextProps.pokemonSpeciesInfo.evolution_chain.url.split('/').slice(-2)[0]
                    this.setState({
                        evolutionChainId: evolutionChainId
                    })
                    if (!(evolutionChainId in this.props.evolutionChains)){
                        this.props.getEvolutionChain(nextProps.pokemonSpeciesInfo.evolution_chain.url)
                    }else{ // already fetched that evolution chain
                        this.setState({
                            evolutionChain: getEvolutionArray(nextProps.evolutionChains[evolutionChainId]),
                            fetchingEvolutionChain: false
                        })
                    }
                }
            }else if(nextProps.ajaxEvolutionChain.fetched && !this.props.ajaxEvolutionChain.fetched){
                if (nextProps.ajaxEvolutionChain.success){
                    this.setState({
                        evolutionChain: getEvolutionArray(nextProps.evolutionChains[this.state.evolutionChainId]),
                        fetchingEvolutionChain: false
                    })
                }
            }
        }

    }
    onRequestClose = ()=>{
        this.setState({
            evolutionChain: [],
            fetchingEvolutionChain: true,
            open: false,
        })
        this.props.onRequestClosePokemon()
    }
    render(){
        return (
            <PokemonInfo
                open={this.props.openPokemonInfo}
                fullPokemonInfo={this.props.singlePokemonFullInfo}
                basicInfo={this.props.pokemons[this.props.pokemonChosen]}
                onRequestClose={this.onRequestClose}
                ajax={this.props.ajaxSinglePokemon}
                evolutionChain={this.state.evolutionChain}
                fetchingEvolutionChain={this.state.fetchingEvolutionChain}
                />
        )
    }
}
const mapStateToProps = (state)=>(
	{
		ajaxSinglePokemon: state.pokemons.ajax.single,
        ajaxPokemonSpecies: state.pokemons.ajax.pokemonSpecies,
        ajaxEvolutionChain: state.pokemons.ajax.evolutionChain,
        singlePokemonFullInfo: state.pokemons.singlePokemonFullInfo,
        pokemonSpeciesInfo: state.pokemons.pokemonSpeciesInfo,
        evolutionChains: state.pokemons.evolutionChains,
        pokemons: state.pokemons.pokemons,
	}
)


export default connect(mapStateToProps,{getSinglePokemon,getPokemonSpecies,getEvolutionChain})(PokemonInfoContainer)
