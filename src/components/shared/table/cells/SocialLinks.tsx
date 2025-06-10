
import React from 'react';
import { Link } from 'lucide-react';

interface SocialLinksProps {
  links: {
    linkedin?: string;
    instagram?: string;
    twitter?: string;
    facebook?: string;
    website?: string;
  };
}

export function SocialLinks({ links }: SocialLinksProps) {
  const socialPlatforms = [
    { key: 'linkedin', color: 'text-blue-600 hover:text-blue-800', label: 'LinkedIn' },
    { key: 'instagram', color: 'text-pink-600 hover:text-pink-800', label: 'Instagram' },
    { key: 'twitter', color: 'text-blue-400 hover:text-blue-600', label: 'Twitter' },
    { key: 'facebook', color: 'text-blue-700 hover:text-blue-900', label: 'Facebook' },
    { key: 'website', color: 'text-gray-600 hover:text-gray-800', label: 'Website' },
  ];

  return (
    <div className="flex items-center gap-1">
      {socialPlatforms.map(platform => {
        const url = links[platform.key as keyof typeof links];
        if (!url) return null;

        return (
          <a
            key={platform.key}
            href={url}
            target="_blank"
            rel="noopener noreferrer"
            className={`transition-colors ${platform.color}`}
            title={platform.label}
          >
            <Link className="h-3 w-3" />
          </a>
        );
      })}
    </div>
  );
}
