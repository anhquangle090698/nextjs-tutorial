import { GetStaticPaths, GetStaticProps, GetStaticPropsContext } from 'next';
import * as React from 'react';
import { PokemonList } from '.';

interface PokeMon {
    name: string,
    sprites: {
        front_default : string
    }
}

export interface PokeMonProps {
    pokemon: PokeMon
}

export default function PokeMon({ pokemon }: PokeMonProps) {
    
    if(!pokemon) return <p>Not found pokemon here!!</p>
    
    return (
        <div className='pokemon-container'>
            <h2>{pokemon.name}</h2>
            <img className='pokemon-img' src={pokemon.sprites.front_default} alt={pokemon.name} />
        </div>
    );
}

export const getStaticPaths: GetStaticPaths = async () => {

    const response = await fetch('https://pokeapi.co/api/v2/pokemon?limit=20&offset=0');
    const data = await response.json();
    console.log('static paths');
    
    return {
        paths: data.results.map((d: PokemonList) => ({params: {name : d.name}})),
        fallback: false
    }
}

export const getStaticProps: GetStaticProps<PokeMonProps> = async (context: GetStaticPropsContext) => {
    //server-sides
    //build-time
    console.log('static props');
    const pokemonName = context.params?.name;
    const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemonName}`);
    const data = await response.json();
    
    if(!data) return {notFound : true}

    const pokemon = {
        name: data.forms[0].name,
        sprites: {
            front_default: data.sprites.front_default
        }
    }
    return {
        props: {
            pokemon: pokemon
        }
    }
}