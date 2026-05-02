import React from 'react';
import { Helmet } from 'react-helmet-async';

interface SEOProps {
    title: string;
    description: string;
}

const SEO: React.FC<SEOProps> = ({ title, description }) => {
    return (
        <Helmet>
            <title>{title} | ScriptsPlay</title>
            <meta name="description" content={description} />
            <meta property="og:title" content={`${title} | ScriptsPlay`} />
            <meta property="og:description" content={description} />
            <meta property="og:type" content="website" />
        </Helmet>
    );
};

export default SEO;
