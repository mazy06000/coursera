import React from 'react';

type SectionProps = {
    title?: string;
    children: React.ReactNode;
}

export const Section = ({ title = "My Subheading", children }: SectionProps) => {
    return (
        <section>
            <h2>{ title }</h2>
            <p>{ children }</p>
        </section>
    );
}

