
import React from 'react';
import { Badge } from '@/components/ui/badge';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';

interface LanguageProps {
  language: string;
  supported: boolean;
  coverage?: 'full' | 'partial' | 'experimental';
}

const LanguageSupportIndicator = ({ 
  languages 
}: { 
  languages: LanguageProps[] 
}) => {
  const getColorForCoverage = (supported: boolean, coverage?: 'full' | 'partial' | 'experimental') => {
    if (!supported) return 'bg-destructive text-destructive-foreground';
    
    switch (coverage) {
      case 'full':
        return 'bg-green-600 text-white';
      case 'partial':
        return 'bg-yellow-600 text-white';
      case 'experimental':
        return 'bg-orange-600 text-white';
      default:
        return 'bg-blue-600 text-white';
    }
  };

  return (
    <div className="flex flex-wrap gap-2">
      {languages.map((lang) => (
        <TooltipProvider key={lang.language}>
          <Tooltip>
            <TooltipTrigger>
              <Badge className={getColorForCoverage(lang.supported, lang.coverage)}>
                {lang.language}
              </Badge>
            </TooltipTrigger>
            <TooltipContent>
              {lang.supported 
                ? `${lang.coverage || 'Supported'} support for ${lang.language}` 
                : `${lang.language} is not supported yet`}
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      ))}
    </div>
  );
};

export default LanguageSupportIndicator;
