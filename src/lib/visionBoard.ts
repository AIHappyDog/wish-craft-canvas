// Vision Board storage and management system
export interface VisionBoardItem {
  id: string;
  type: 'text' | 'image';
  title: string;
  content: any;
  createdAt: Date;
  style?: string;
}

export class VisionBoardManager {
  private static STORAGE_KEY = 'vision-board-items';

  static addItem(item: Omit<VisionBoardItem, 'id' | 'createdAt'>): VisionBoardItem {
    const newItem: VisionBoardItem = {
      ...item,
      id: crypto.randomUUID(),
      createdAt: new Date()
    };

    const items = this.getAllItems();
    items.unshift(newItem); // Add to beginning
    this.saveItems(items);

    return newItem;
  }

  static getAllItems(): VisionBoardItem[] {
    try {
      const stored = localStorage.getItem(this.STORAGE_KEY);
      if (!stored) return [];
      
      const items = JSON.parse(stored);
      return items.map((item: any) => ({
        ...item,
        createdAt: new Date(item.createdAt)
      }));
    } catch (error) {
      console.error('Error loading vision board items:', error);
      return [];
    }
  }

  static removeItem(id: string): boolean {
    const items = this.getAllItems();
    const filtered = items.filter(item => item.id !== id);
    this.saveItems(filtered);
    return filtered.length !== items.length;
  }

  static clearAll(): void {
    localStorage.removeItem(this.STORAGE_KEY);
  }

  private static saveItems(items: VisionBoardItem[]): void {
    try {
      localStorage.setItem(this.STORAGE_KEY, JSON.stringify(items));
    } catch (error) {
      console.error('Error saving vision board items:', error);
    }
  }

  static getItemCount(): number {
    return this.getAllItems().length;
  }

  static getItemsByType(type: 'text' | 'image'): VisionBoardItem[] {
    return this.getAllItems().filter(item => item.type === type);
  }
}
