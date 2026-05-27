/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export interface AudienceSegment {
  id: string;
  name: string;
  description: string;
  demographics: {
    ageRange: string;
    location: string;
    incomeLevel: string;
    occupations: string[];
  };
  interests: string[];
  behaviors: string[];
  painPoints: string[];
  marketingStrategy: string;
  adCopySuggestions: string[];
}

export interface AdStructure {
  id: string;
  platform: 'Meta' | 'Google' | 'TikTok' | 'LinkedIn' | 'X';
  structureType: 'Carousel' | 'Static Image' | 'Short-form Video' | 'Search Ad';
  effectivenessScore: number;
  aiRecommendations: string[];
}

export interface CampaignAnalysis {
  productName: string;
  productDescription: string;
  targetAudiences: AudienceSegment[];
  recommendedStructures: AdStructure[];
  marketContext: string;
}

export interface AppState {
  analysis: CampaignAnalysis | null;
  isAnalyzing: boolean;
  history: CampaignAnalysis[];
}
