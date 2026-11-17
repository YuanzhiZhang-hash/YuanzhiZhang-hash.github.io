"use client";import dynamic from 'next/dynamic';const Games=dynamic(()=>import('@/components/widgets/GamesPanel'),{ssr:false});export default function ClientWidgets(){return <><Games/></>;}
