class UploadController {
  private controllers = new Map<number, AbortController>();

  create(slotId: number): AbortController {
    this.cancel(slotId); // Cancel existing if any
    
    const controller = new AbortController();
    this.controllers.set(slotId, controller);
    return controller;
  }

  get(slotId: number): AbortController | undefined {
    return this.controllers.get(slotId);
  }

  cancel(slotId: number): void {
    const controller = this.controllers.get(slotId);
    if (controller) {
      controller.abort();
      this.controllers.delete(slotId);
    }
  }

  complete(slotId: number): void {
    this.controllers.delete(slotId);
  }

  cancelAll(): void {
    this.controllers.forEach((controller) => controller.abort());
    this.controllers.clear();
  }

  hasActive(slotId: number): boolean {
    return this.controllers.has(slotId);
  }
}

// Singleton instance
let instance: UploadController | null = null;

export const getUploadController = (): UploadController => {
  if (!instance) {
    instance = new UploadController();
  }
  return instance;
};

export const resetUploadController = (): void => {
  instance?.cancelAll();
  instance = null;
};