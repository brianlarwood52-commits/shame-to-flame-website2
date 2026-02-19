'use client'

import React from 'react';
import Link from 'next/link';
import { ExternalLink, Heart, Book, Users, Globe } from 'lucide-react';

const MinistryHub = () => {
  const ministries = [
    {
      name: "Learn Live Forgive",
      description: "A comprehensive resource for understanding and practicing biblical forgiveness in all areas of life.",
      focus: "Forgiveness Education & Training",
      website: "learnliveforgive.org",
      logo: null,
      features: [
        "Interactive forgiveness workshops",
        "Biblical forgiveness curriculum",
        "Personal forgiveness coaching",
        "Community support groups"
      ],
      color: "sky",
      icon: Heart
    },
    {
      name: "Running to God",
      description: "Supporting those who have experienced spiritual abuse and are seeking to rebuild their relationship with God.",
      focus: "Spiritual Abuse Recovery",
      website: "runningtogod.org",
      logo: "/running-to-god-logo.jpg",
      features: [
        "Spiritual abuse recovery programs",
        "Healthy theology resources",
        "Trauma-informed counseling",
        "Safe community spaces"
      ],
      color: "sage",
      icon: Users
    },
    {
      name: "Project Reconcile",
      description: "Bridging divides and healing relationships through biblical reconciliation principles.",
      focus: "Relationship Restoration",
      website: "projectreconcile.org",
      logo: "/project-reconcile-card-logo7.jpg",
      features: [
        "Conflict resolution training",
        "Marriage restoration support",
        "Family healing programs",
        "Community mediation services"
      ],
      color: "purple",
      icon: Book
    }
  ];


  const crisisResources = {
    us: [
      {
        name: "National Suicide Prevention Lifeline",
        contact: "988",
        description: "24/7 Crisis Support",
        url: "https://988lifeline.org/"
      },
      {
        name: "Crisis Text Line",
        contact: "Text HOME to 741741",
        description: "24/7 Text Support",
        url: "https://www.crisistextline.org/"
      }
    ],
    australia: [
      {
        name: "Lifeline Australia",
        contact: "13 11 14",
        description: "24/7 Crisis Support",
        url: "https://www.lifeline.org.au/"
      },
      {
        name: "Suicide Call Back Service",
        contact: "1300 659 467",
        description: "24/7 Support",
        url: "https://www.suicidecallbackservice.org.au/"
      },
      {
        name: "Beyond Blue",
        contact: "1300 22 4636",
        description: "Mental Health Support",
        url: "https://www.beyondblue.org.au/"
      },
      {
        name: "MensLine Australia",
        contact: "1300 78 99 78",
        description: "24/7 Men's Support",
        url: "https://mensline.org.au/"
      },
      {
        name: "Kids Helpline",
        contact: "1800 55 1800",
        description: "For ages 5-25",
        url: "https://kidshelpline.com.au/"
      },
      {
        name: "Brave Enough Careline",
        contact: "1800 272 838",
        description: "Freecall Support",
        url: "https://www.braveenough.org/"
      }
    ]
  };

  const getColorClasses = (color: string) => {
    const colorMap: { [key: string]: string } = {
      sky: "from-sky-400 to-sky-600 border-sky-200",
      sage: "from-sage-400 to-sage-600 border-sage-200",
      purple: "from-purple-400 to-purple-600 border-purple-200"
    };
    return colorMap[color] || colorMap.sky;
  };

  return (
    <div className="animate-fade-in">
      {/* Hero Section */}
      <section className="py-20 bg-gradient-to-br from-sky-50 to-flame-50 dark:from-sky-900/30 dark:to-flame-900/30">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <Globe className="h-16 w-16 text-flame-500 mx-auto mb-6" />
          <h1 className="font-serif text-4xl md:text-5xl font-bold text-gray-800 dark:text-white mb-6">
            Ministry Hub
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-300 leading-relaxed max-w-3xl mx-auto">
            A network of healing ministries working together to address different 
            aspects of spiritual, emotional, and relational restoration. Together, 
            we're stronger in our mission to bring hope and healing.
          </p>
        </div>
      </section>

      {/* Partner Ministries */}
      <section className="py-16 bg-white dark:bg-gray-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="font-serif text-3xl md:text-4xl font-bold text-gray-800 dark:text-white mb-12 text-center">
            Our Partner Ministries
          </h2>
          
          <div className="space-y-12">
            {ministries.map((ministry, index) => (
              <div key={index} className="bg-gradient-to-r from-gray-50 to-gray-100 dark:from-gray-800 dark:to-gray-700 rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300">
                <div className="flex flex-col lg:flex-row">
                  <div className={`lg:w-1/3 h-48 lg:h-auto ${
                    ministry.logo 
                      ? ministry.name === "Project Reconcile" 
                        ? 'bg-black' 
                        : 'bg-white dark:bg-gray-100' 
                      : `bg-gradient-to-br ${getColorClasses(ministry.color)}`
                  } flex items-center justify-center ${ministry.name === "Project Reconcile" ? 'p-0' : 'p-6'}`}>
                    {ministry.logo ? (
                      <img 
                        src={ministry.logo} 
                        alt={`${ministry.name} logo`}
                        className="max-w-full max-h-full object-contain"
                      />
                    ) : (
                      <ministry.icon className="h-16 w-16 text-white" />
                    )}
                  </div>
                  
                  <div className="lg:w-2/3 p-8">
                    <div className="flex items-center justify-between mb-4">
                      <h3 className="font-serif text-2xl font-bold text-gray-800 dark:text-white">{ministry.name}</h3>
                      <a 
                        href={`https://${ministry.website}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center text-flame-600 dark:text-flame-400 hover:text-flame-700 dark:hover:text-flame-300 font-medium"
                      >
                        Visit Site
                        <ExternalLink className="ml-1 h-4 w-4" />
                      </a>
                    </div>
                    
                    <div className="mb-4">
                      <span className="inline-block bg-flame-100 dark:bg-flame-900/30 text-flame-700 dark:text-flame-300 text-sm font-medium px-3 py-1 rounded-full">
                        {ministry.focus}
                      </span>
                    </div>
                    
                    <p className="text-gray-600 dark:text-gray-300 leading-relaxed mb-6">{ministry.description}</p>
                    
                    <div>
                      <h4 className="font-semibold text-gray-800 dark:text-white mb-3">Key Features:</h4>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                        {ministry.features.map((feature, idx) => (
                          <div key={idx} className="flex items-center">
                            <span className="w-2 h-2 bg-flame-400 rounded-full mr-3"></span>
                            <span className="text-gray-600 dark:text-gray-300">{feature}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Important Note */}
      <section className="py-16 bg-gradient-to-r from-yellow-50 to-orange-50 dark:from-yellow-900/20 dark:to-orange-900/20 border-t-2 border-b-2 border-yellow-200 dark:border-yellow-700">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-white dark:bg-gray-800 rounded-xl p-8 border-l-4 border-yellow-400 dark:border-yellow-600 shadow-lg">
            <h2 className="font-serif text-2xl font-bold text-yellow-800 dark:text-yellow-300 mb-4 text-center">Important Note</h2>
            <p className="text-yellow-700 dark:text-yellow-300 text-lg text-center leading-relaxed">
              While our ministries provide spiritual and emotional support, we recognize that some
              situations require professional medical or psychological intervention.
            </p>
          </div>
        </div>
      </section>

      {/* Crisis Resources */}
      <section className="py-16 bg-red-50 dark:bg-red-900/20 border-t-4 border-red-200 dark:border-red-700">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="font-serif text-3xl font-bold text-white mb-6 text-center">
            Crisis Support Resources
          </h2>
          <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg mb-6">
            <p className="text-gray-700 dark:text-gray-200 mb-2 text-center font-semibold">
              If you're having thoughts of self-harm or suicide, please reach out to the following services for immediate help:
            </p>
            <div className="bg-red-100 dark:bg-red-900/40 border-2 border-red-500 rounded-lg p-4 mb-4">
              <p className="text-red-900 dark:text-red-200 text-center font-bold text-lg">
                If you are in immediate danger call 000.
              </p>
            </div>
            <p className="text-white mb-6 text-center text-sm font-bold">
              These services are independent from Shame to Flame, and are included for public support and crisis assistance.
            </p>

            <div className="mb-8">
              <h3 className="font-semibold text-lg text-gray-800 dark:text-white mb-4 text-center">United States</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-center">
                {crisisResources.us.map((resource, index) => (
                  <div key={index} className="bg-red-50 dark:bg-red-900/30 p-4 rounded-lg">
                    <a href={resource.url} target="_blank" rel="noopener noreferrer" className="font-semibold text-gray-800 dark:text-white hover:text-red-600 dark:hover:text-red-400 transition-colors">
                      {resource.name}
                    </a>
                    <p className="text-xl font-bold text-red-600 dark:text-red-400">{resource.contact}</p>
                  </div>
                ))}
              </div>
            </div>

            <div>
              <h3 className="font-semibold text-lg text-gray-800 dark:text-white mb-4 text-center">Australia</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-center">
                {crisisResources.australia.map((resource, index) => (
                  <div key={index} className="bg-red-50 dark:bg-red-900/30 p-4 rounded-lg">
                    <a href={resource.url} target="_blank" rel="noopener noreferrer" className="font-semibold text-gray-800 dark:text-white hover:text-red-600 dark:hover:text-red-400 transition-colors">
                      {resource.name}
                    </a>
                    <p className="text-xl font-bold text-red-600 dark:text-red-400">{resource.contact}</p>
                    <p className="text-xs text-gray-600 dark:text-gray-400 mt-1">{resource.description}</p>
                  </div>
                ))}
              </div>
            </div>

            <p className="text-sm text-gray-600 dark:text-gray-300 mt-6 text-center">
              These resources are available 24/7 and provide immediate, professional support.
            </p>
          </div>
        </div>
      </section>

      {/* Scripture Foundation */}
      <section className="py-16 bg-gradient-to-br from-sky-50 to-flame-50 dark:from-sky-900/30 dark:to-flame-900/30">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <Book className="h-12 w-12 text-sky-600 dark:text-sky-400 mx-auto mb-6" />
          <h2 className="font-serif text-3xl font-bold text-gray-800 dark:text-white mb-8">
            United in Purpose
          </h2>
          
          <blockquote className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg">
            <p className="font-serif text-xl text-gray-700 dark:text-gray-200 italic mb-3">
              "As iron sharpens iron, so one person sharpens another... Though one may be overpowered, 
              two can defend themselves. A cord of three strands is not quickly broken."
            </p>
            <cite className="text-flame-600 dark:text-flame-400 font-medium">Proverbs 27:17, Ecclesiastes 4:12</cite>
          </blockquote>
        </div>
      </section>
    </div>
  );
};

export default MinistryHub;