
export enum TrafficLight {
  GREEN = 'GREEN',
  YELLOW = 'YELLOW',
  RED = 'RED'
}

export enum FoodCategory {
  VEGETABLES = '蔬菜',
  FRUITS = '水果',
  DAIRY_SOY_LACTOSE_FREE = '乳制品及替代品',
  PULSES_TOFU_NUTS = '豆类、豆腐及坚理',
  BEVERAGES = '饮料',
  MEAT_FISH_EGGS_OILS = '肉、鱼、蛋及油脂',
  CONDIMENTS = '调味品',
  SNACKS_BARS_COOKIES = '零食及饼干',
  CONFECTIONERY_SUGARS = '糖果及糖类',
  DIETARY_SUPPLEMENTS = '膳食补充剂',
  PERSONAL_UPDATED = '个人更新食物',
  BREAD_CEREALS_RICE_PASTA = '主食、谷物及面食'
}

export interface Portion {
  label: string;
  weight: string;
  light: TrafficLight;
}

export interface FoodItem {
  id: string;
  nameZh: string;
  nameEn: string;
  category: FoodCategory;
  baseLight: TrafficLight;
  personalizedLight: TrafficLight;
  portions: Portion[];
  imageUrl?: string;
  reason?: string;
}

export interface SymptomLog {
  id: string;
  timestamp: number;
  symptoms: string[];
  severity: number;
  stressLevel: number;
  jointPainAreas?: string[]; 
}

export interface FoodLog {
  id: string;
  timestamp: number;
  foodItems: string[];
  amount: string;
}

export interface StoolLog {
  id: string;
  timestamp: number;
  type: number;
  amount: '少量' | '中量' | '大量';
  color: string;
  feeling: string;
}

export interface AssessmentResult {
  dysbiosisScore: number;
  digestionScore: number;
  leakyGutScore: number;
  timestamp: number;
}

export interface Recipe {
  id: string;
  title: string;
  phase: 'REMOVE' | 'REPLACE' | 'REINOCULATE' | 'REPAIR';
  tags: string[];
  imageUrl: string;
  calories: number;
  time: string;
  ingredients: string[];
  instructions: string[];
}

export interface Post {
  id: string;
  author: string;
  authorAvatar: string;
  title: string;
  content: string;
  imageUrl: string;
  likes: number;
  tags: string[];
}

export interface ChatMessage {
  role: 'user' | 'model';
  text: string;
}
