# Frontend klient WS (dopasuj do creatorId z route)

### 🔌

```

```

const socket = useRef<Socket | null>(null);

useEffect(() => {
socket.current = io('wss://tipjar.plus', {
query: { creatorId },
transports: ['websocket'],
});

socket.current.on('tip', (tip: TipEntry) => {
setQueue((prev) => [...prev, tip]);
});

return () => {
socket.current?.disconnect();
};
}, []);