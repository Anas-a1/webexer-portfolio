import React, { useState } from "react";
import Tilt from "react-parallax-tilt";
import { motion } from "framer-motion";

import { styles } from "../styles";
import { github , demo } from "../assets";
import { SectionWrapper } from "../hoc";
import { projects } from "../constants";
import { fadeIn, textVariant } from "../utils/motion";
import ImageGallery from "./ImageGallery";

const ProjectCard = ({
  index,
  name,
  description,
  tags,
  image,
  source_code_link,
  live_demo_link,
  category,
  gallery_images,
  setGalleryState,
}) => {
  return (
    <motion.div variants={fadeIn("up", "spring", index * 0.5, 0.75)}>
      <Tilt
        options={{
          max: 45,
          scale: 1,
          speed: 450,
        }}
        className='bg-[#0f172a] rounded-2xl p-5 flex flex-col shadow-lg hover:-translate-y-1 hover:shadow-2xl transition w-full h-full'
      >
        <div className='relative mb-4 overflow-hidden rounded-xl aspect-[16/9]'>
          <img
            src={image}
            alt='project_image'
            className='w-full h-full object-cover'
          />
          
          <div className='absolute inset-0 flex justify-between m-3 card-img_hover'>
            {/* Live Demo Icon - Aligned to the left */}
            <button
              onClick={() => window.open(live_demo_link, "_blank")}
              className='black-gradient w-10 h-10 rounded-full flex justify-center items-center cursor-pointer'
              aria-label="View live demo"
            >
              <img
                src={demo}
                alt='live demo'
                className='w-1/2 h-1/2 object-contain'
              />
            </button>

            {/* Gallery Icon for WordPress projects - Aligned to the right */}
            {category === "wordpress" && gallery_images ? (
              <button
                onClick={() => setGalleryState({ isOpen: true, images: gallery_images })}
                className='black-gradient w-10 h-10 rounded-full flex justify-center items-center cursor-pointer'
                aria-label="View project gallery">
                <svg
                  className='w-1/2 h-1/2 object-contain text-white'
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  aria-hidden="true"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
              </button>
            ) : (
              /* GitHub Icon for Custom projects - Aligned to the right */
              <button
                onClick={() => window.open(source_code_link, "_blank")}
                className='black-gradient w-10 h-10 rounded-full flex justify-center items-center cursor-pointer'
                aria-label="View source code">
                <img
                  src={github}
                  alt='source code'
                  className='w-1/2 h-1/2 object-contain'
                />
              </button>
            )}
          </div>
        </div>

        <div className='flex-grow flex flex-col'>
          <h3 className='text-white font-bold text-[24px]'>{name}</h3>
          <p className='mt-2 text-secondary text-[14px] flex-grow'>{description}</p>
        </div>

        <div className='mt-4 flex flex-wrap gap-2'>
          {tags.map((tag) => (
            <p
              key={`${name}-${tag.name}`}
              className={`text-[14px] ${tag.color}`}
            >
              #{tag.name}
            </p>
          ))}
        </div>
      </Tilt>
    </motion.div>
  );
};

const Works = () => {
  const [activeTab, setActiveTab] = useState("custom");
  const [galleryState, setGalleryState] = useState({ isOpen: false, images: [] });
  
  const filteredProjects = projects.filter(p => p.category === activeTab);

  return (
    <div className="max-w-6xl mx-auto px-4">
      <motion.div variants={textVariant()}>
        <p className={`${styles.sectionSubText}`}>My work</p>
        <h2 className={`${styles.sectionHeadText} text-4xl md:text-5xl font-extrabold`}>Projects.</h2>
      </motion.div>

      <div className='w-full flex'>
        <motion.p
          variants={fadeIn("", "", 0.1, 1)}
          className='mt-3 text-secondary text-sm md:text-base max-w-3xl leading-[30px]'
        >
           projects showcases my skills and experience through
          real-world examples of my work. Each project is briefly described with
          links to code repositories and live demos in it. It reflects my
          ability to solve complex problems, work with different technologies,
          and manage projects effectively.
        </motion.p>
      </div>

      <div className='relative mb-10 mt-20'>
        {/* Simplified background for mobile */}
        <div className="absolute inset-0 flex items-center justify-center overflow-hidden">
          <div className="relative w-64 h-64 sm:w-80 sm:h-80 md:w-96 md:h-96">
            {/* Orbital rings - simplified on mobile */}
            <div className="absolute inset-0 border border-violet-600/5 rounded-full animate-spin hidden sm:block" style={{ animationDuration: '20s' }}></div>
            <div className="absolute inset-4 border border-blue-600/5 rounded-full animate-spin hidden sm:block" style={{ animationDuration: '15s', animationDirection: 'reverse' }}></div>
            <div className="absolute inset-8 border border-cyan-600/5 rounded-full animate-spin hidden md:block" style={{ animationDuration: '10s' }}></div>
            
            {/* Orbiting particles - reduced on mobile */}
            <div className="absolute top-0 left-1/2 transform -translate-x-1/2 w-2 h-2 bg-violet-600 rounded-full animate-pulse"></div>
            <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-2 h-2 bg-blue-600 rounded-full animate-pulse hidden sm:block" style={{ animationDelay: '1s' }}></div>
            <div className="absolute left-0 top-1/2 transform -translate-y-1/2 w-2 h-2 bg-cyan-600 rounded-full animate-pulse hidden md:block" style={{ animationDelay: '2s' }}></div>
            <div className="absolute right-0 top-1/2 transform -translate-y-1/2 w-2 h-2 bg-purple-600 rounded-full animate-pulse hidden lg:block" style={{ animationDelay: '3s' }}></div>
          </div>
        </div>

        {/* Responsive tab system */}
        <div className='relative flex justify-center items-center z-10'>
          <div className='relative flex items-center gap-4 sm:gap-6 md:gap-8 lg:gap-12'>
            {/* Connection lines - responsive */}
            <div className={`absolute top-1/2 left-1/2 h-0.5 bg-gradient-to-r transition-all duration-500 ${
              activeTab === "custom"
                ? "from-violet-600 to-transparent"
                : "from-transparent to-blue-600"
            }`} style={{
              transform: 'translateY(-50%)',
              width: activeTab === "custom" ? '50%' : '50%',
              left: activeTab === "custom" ? '50%' : '0%'
            }}></div>
            
            {/* Custom Projects Tab - Responsive */}
            <button
              onClick={() => setActiveTab("custom")}
              className='relative group cursor-pointer bg-transparent border-none p-0'
              role="tab"
              aria-selected={activeTab === "custom"}
              aria-controls="custom-projects-panel"
              id="custom-projects-tab"
            >
              {/* Outer glow ring - responsive size */}
              <div className={`absolute -inset-2 sm:-inset-3 rounded-full transition-all duration-500 ${
                activeTab === "custom"
                  ? "bg-gradient-to-r from-violet-600/20 to-purple-600/20 blur-lg animate-pulse"
                  : "bg-gradient-to-r from-transparent to-transparent group-hover:from-violet-600/10 group-hover:to-purple-600/10"
              }`}></div>
              
              {/* Middle ring - responsive */}
              <div className={`absolute -inset-1 sm:-inset-2 rounded-full border transition-all duration-300 ${
                activeTab === "custom"
                  ? "border-violet-400 animate-spin"
                  : "border-black-200 group-hover:border-violet-600/50"
              }`} style={{ animationDuration: activeTab === "custom" ? '3s' : '0s' }}></div>
              
              {/* Inner core - responsive size */}
              <div className={`relative w-14 h-14 sm:w-16 sm:h-16 md:w-20 md:h-20 lg:w-24 lg:h-24 rounded-full flex items-center justify-center transition-all duration-300 ${
                activeTab === "custom"
                  ? "bg-gradient-to-br from-violet-600 to-purple-600 shadow-xl shadow-violet-500/40 scale-105"
                  : "bg-tertiary border border-black-200 group-hover:border-violet-600/50 group-hover:scale-105"
              }`}>
                {/* Icon - responsive size */}
                <svg className={`w-6 h-6 sm:w-8 sm:h-8 md:w-10 md:h-10 lg:w-12 lg:h-12 transition-colors ${
                  activeTab === "custom" ? "text-white" : "text-secondary group-hover:text-violet-400"
                }`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
                </svg>
                
                {/* Active indicator - responsive */}
                {activeTab === "custom" && (
                  <div className="absolute -bottom-1 left-1/2 transform -translate-x-1/2 w-1.5 h-1.5 bg-white rounded-full animate-ping"></div>
                )}
              </div>
              
              {/* Label - responsive positioning */}
              <div className={`absolute -bottom-8 sm:-bottom-10 md:-bottom-12 lg:-bottom-16 left-1/2 transform -translate-x-1/2 text-center transition-all duration-300 whitespace-nowrap ${
                activeTab === "custom" ? "opacity-100 scale-105" : "opacity-70 group-hover:opacity-100"
              }`}>
                <p className={`font-bold text-xs sm:text-sm ${
                  activeTab === "custom" ? "text-violet-400" : "text-secondary group-hover:text-violet-400"
                }`}>Custom</p>
                <p className={`text-xs hidden sm:block ${
                  activeTab === "custom" ? "text-violet-300" : "text-secondary/70 group-hover:text-secondary"
                }`}>Full-Stack                </p>
              </div>
            </button>

            {/* WordPress Projects Tab - Responsive */}
            <button
              onClick={() => setActiveTab("wordpress")}
              className='relative group cursor-pointer bg-transparent border-none p-0'
              role="tab"
              aria-selected={activeTab === "wordpress"}
              aria-controls="wordpress-projects-panel"
              id="wordpress-projects-tab"
            >
              {/* Outer glow ring - responsive size */}
              <div className={`absolute -inset-2 sm:-inset-3 rounded-full transition-all duration-500 ${
                activeTab === "wordpress"
                  ? "bg-gradient-to-r from-blue-600/20 to-cyan-600/20 blur-lg animate-pulse"
                  : "bg-gradient-to-r from-transparent to-transparent group-hover:from-blue-600/10 group-hover:to-cyan-600/10"
              }`}></div>
              
              {/* Middle ring - responsive */}
              <div className={`absolute -inset-1 sm:-inset-2 rounded-full border transition-all duration-300 ${
                activeTab === "wordpress"
                  ? "border-blue-400 animate-spin"
                  : "border-black-200 group-hover:border-blue-600/50"
              }`} style={{ animationDuration: activeTab === "wordpress" ? '3s' : '0s' }}></div>
              
              {/* Inner core - responsive size */}
              <div className={`relative w-14 h-14 sm:w-16 sm:h-16 md:w-20 md:h-20 lg:w-24 lg:h-24 rounded-full flex items-center justify-center transition-all duration-300 ${
                activeTab === "wordpress"
                  ? "bg-gradient-to-br from-blue-600 to-cyan-600 shadow-xl shadow-blue-500/40 scale-105"
                  : "bg-tertiary border border-black-200 group-hover:border-blue-600/50 group-hover:scale-105"
              }`}>
                {/* Icon - responsive size */}
                <svg className={`w-6 h-6 sm:w-8 sm:h-8 md:w-10 md:h-10 lg:w-12 lg:h-12 transition-colors ${
                  activeTab === "wordpress" ? "text-white" : "text-secondary group-hover:text-blue-400"
                }`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
                
                {/* Active indicator - responsive */}
                {activeTab === "wordpress" && (
                  <div className="absolute -bottom-1 left-1/2 transform -translate-x-1/2 w-1.5 h-1.5 bg-white rounded-full animate-ping"></div>
                )}
              </div>
              
              {/* Label - responsive positioning */}
              <div className={`absolute -bottom-8 sm:-bottom-10 md:-bottom-12 lg:-bottom-16 left-1/2 transform -translate-x-1/2 text-center transition-all duration-300 whitespace-nowrap ${
                activeTab === "wordpress" ? "opacity-100 scale-105" : "opacity-70 group-hover:opacity-100"
              }`}>
                <p className={`font-bold text-xs sm:text-sm ${
                  activeTab === "wordpress" ? "text-blue-400" : "text-secondary group-hover:text-blue-400"
                }`}>WordPress</p>
                <p className={`text-xs hidden sm:block ${
                  activeTab === "wordpress" ? "text-blue-300" : "text-secondary/70 group-hover:text-secondary"
                }`}>CMS                </p>
              </div>
            </button>
          </div>
        </div>

        {/* Status indicator - responsive */}
        <div className="flex justify-center mt-12 sm:mt-16 md:mt-20 lg:mt-24">
          <div className={`px-3 sm:px-4 md:px-6 py-1.5 sm:py-2 rounded-full text-xs sm:text-sm font-medium transition-all duration-500 ${
            activeTab === "custom"
              ? "bg-violet-600/20 text-violet-300 border border-violet-600/30"
              : "bg-blue-600/20 text-blue-300 border border-blue-600/30"
          }`}>
            <span className="hidden sm:inline">
              {activeTab === "custom" ? "🚀 Custom Projects Active" : "📝 WordPress Projects Active"}
            </span>
            <span className="sm:hidden">
              {activeTab === "custom" ? "🚀 Custom" : "📝 WordPress"}
            </span>
          </div>
        </div>
      </div>

      <div 
        className='grid gap-8 grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 mt-20 items-stretch'
        role="tabpanel"
        id={`${activeTab}-projects-panel`}
        aria-labelledby={`${activeTab}-projects-tab`}
      >
        {filteredProjects.map((project, index) => (
          <ProjectCard
            key={`project-${index}`}
            index={index}
            {...project}
            setGalleryState={setGalleryState}
          />
        ))}
      </div>

      {/* Image Gallery Modal */}
      <ImageGallery
        isOpen={galleryState.isOpen}
        images={galleryState.images}
        onClose={() => setGalleryState({ isOpen: false, images: [] })}
      />
    </div>
  );
};

export default SectionWrapper(Works, "");
