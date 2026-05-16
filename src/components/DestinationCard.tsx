import React from 'react';
import { Link } from 'wouter';
import { motion } from 'framer-motion';
import { IMG } from '@/lib/images';

interface DestinationCardProps {
  name: string;
  country: string;
  price: string;
  imageSrc?: string;
}

export const DestinationCard = ({ name, country, price, imageSrc }: DestinationCardProps) => {
  return (
    <motion.div 
      className="group relative overflow-hidden bg-card cursor-pointer md:cursor-none block h-[320px] md:h-[450px]"
      whileHover={{ y: -10 }}
      transition={{ duration: 0.4, ease: "easeOut" }}
    >
      <div className="absolute inset-0 bg-black/40 z-10 group-hover:bg-transparent transition-colors duration-500" />
      
      <div 
        className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-110"
        style={{ backgroundImage: `url(${imageSrc || IMG.hero})` }}
      />
      
      <div className="absolute inset-0 bg-gradient-to-t from-background via-background/20 to-transparent z-10" />
      
      <div className="absolute inset-0 p-8 flex flex-col justify-end z-20">
        <p className="text-primary tracking-widest text-xs uppercase mb-2 font-medium">{country}</p>
        <h3 className="font-sans text-3xl font-bold text-foreground mb-4">{name}</h3>
        
        <div className="flex items-center justify-between opacity-0 translate-y-4 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-500">
          <span className="text-muted-foreground font-sans">{price}</span>
          <Link href="/plan" className="text-primary hover:text-white transition-colors uppercase tracking-wider text-sm font-semibold hoverable">
            Explore
          </Link>
        </div>
      </div>
    </motion.div>
  );
};
