class UploadController {
  private controllers = new Map<number, AbortController>();

  // Tworzy nowy kontroler dla danego slotu (anuluje poprzedni, by nie było duplikatów)
  create(slotId: number): AbortController {
    if (this.controllers.has(slotId)) {
      this.cancel(slotId);
    }
    
    const controller = new AbortController();
    this.controllers.set(slotId, controller);
    return controller;
  }

  // Pobiera istniejący kontroler (rzadko używane, ale się przydaje)
  get(slotId: number): AbortController | undefined {
    return this.controllers.get(slotId);
  }

  // Anuluje upload
  cancel(slotId: number): void {
    const controller = this.controllers.get(slotId);
    if (controller) {
      controller.abort();
      this.controllers.delete(slotId);
    }
  }

  // Zgłasza zakończenie (czyści pamięć)
  complete(slotId: number): void {
    this.controllers.delete(slotId);
  }

  // Anuluje wszystko (np. przy odmontowaniu komponentu)
  cancelAll(): void {
    this.controllers.forEach((controller) => controller.abort());
    this.controllers.clear();
  }
}

// Singleton - jedna instancja na całą aplikację
let instance: UploadController | null = null;

export const getUploadController = (): UploadController => {
  if (!instance) {
    instance = new UploadController();
  }
  return instance;
};