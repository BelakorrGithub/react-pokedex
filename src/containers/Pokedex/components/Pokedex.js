import React from 'react'
import classes from './styles.css'
import PropTypes from 'prop-types'
import PokemonInfo from '../../components/PokemonInfo'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import MyDrawer from './MyDrawer'
import Pagination from './Pagination'

const Pokedex = ({...props})=>{
    const muiTheme = getMuiTheme({
        fontFamily: 'Muli, sans-serif',
        palette: {
            textColor: "#333333"
        },
    });
    const {
        pokemonList,
        searchTerm,
        onChangeTerm,
        filterValues,
        onChangeFilter,
        clearFilters,
        paginationIndex,
        paginationValue,
        onChangePaginationValue,
        onChangePaginationIndex,
        numberOfPokemon,
        typeOfFilter,
        onChangeTypeOfFilter,
    } = props
    const {
        container,
        pokemonListContainer
    } = classes
    const paginatedPokemonList = pokemonList.slice((paginationIndex-1)*paginationValue,
                                                (paginationIndex)*paginationValue)
    return (
        <MuiThemeProvider muiTheme={muiTheme}>
            <div
                className={container}
                >
                <MyDrawer
                    searchTerm={searchTerm}
                    onChangeTerm={onChangeTerm}
                    filterValues={filterValues}
                    onChangeFilter={onChangeFilter}
                    clearFilters={clearFilters}
                    typeOfFilter={typeOfFilter}
                    onChangeTypeOfFilter={onChangeTypeOfFilter}
                    />
                <Pagination
                    paginationIndex={paginationIndex}
                    paginationValue={paginationValue}
                    onChangePaginationValue={onChangePaginationValue}
                    onChangePaginationIndex={onChangePaginationIndex}
                    numberOfItems={numberOfPokemon}
                    />
                <div
                    className={pokemonListContainer}
                    >

                    {paginatedPokemonList.map((pokemonInfo)=>(
                        <PokemonInfo
                        key={`pokemon-${pokemonInfo.id}`}
                        name={pokemonInfo.name}
                        types={pokemonInfo.types}
                        images={pokemonInfo.images.front_default}
                        />
                    ))}

                </div>
            </div>
        </MuiThemeProvider>
    )
}
Pokedex.propTypes = {

}
export default Pokedex
