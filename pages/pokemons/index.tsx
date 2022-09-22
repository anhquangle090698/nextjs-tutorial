import { GetStaticProps, GetStaticPropsContext } from 'next';
import Link from 'next/link';
import * as React from 'react';

export interface PokeMonListProps {
    pokemons: string[]
}

export interface PokemonList {
    name: string,
    url: string
}

export default function PokemonList({ pokemons }: PokeMonListProps) {
    return (
        <div>
            <h1>Pokemon Lists</h1>

            <ul>
                {
                    pokemons.map((pokemon, idx) => <li key={idx}><Link href={`/pokemons/${pokemon}`}><a>{pokemon}</a></Link></li>)
                }
            </ul>
        </div>
    );
}

export const getStaticProps: GetStaticProps<PokeMonListProps> = async (context: GetStaticPropsContext) => {
    //server-sides
    //build-time
    const response = await fetch('https://pokeapi.co/api/v2/pokemon?limit=20&offset=0');
    const data = await response.json();

    return {
        props: {
            pokemons: data.results.map((d: PokemonList) => d.name)
        }
    }
}