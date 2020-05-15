# PRF 2020 - Hibabejelntő oldal
Hibabejelentő oldal egy telekommunikációs cégnek, ahol van tv, internet és telefon szolgáltatás a következők alapján:

a) Egy NodeJS szerver, ami képes usereket tárolni admin / ügyfél jogosultsági körök szerint, az adminokhoz ügyfeleket,
az ügyfelekhez hibabejelentéseket (szolgáltatás típusa, hiba, cím) rendel (a hibabejelentéseknek külön sémája mongodb-ben).

b) Egy Angular webapp, amelyben adminok és ügyfelek is képesek bejelentkezni, az adminok egy hibalistából választhatják ki az ügyfeleket
és dashboardokon feltöltés szerint rendezve megtekinthetőek a bejelentések. Az ügyfeleket bejelentkezés után egy egyszerű felületet kapnak,
ahol csak a saját korábbi hibabejelentéseiket tekinthetik meg, és új bejelentést vihetnek fel a szerverre, valamint saját datait módosíthatja.
A loginhoz igénybe vettem az Angular authGuard nevű opcióját a route-ok levédéséhez.
