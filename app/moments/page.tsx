import {Suspense} from 'react';import Moments from './MomentsClient';export default function Page(){return <Suspense fallback={<div>加载中…</div>}><Moments/></Suspense>;}
