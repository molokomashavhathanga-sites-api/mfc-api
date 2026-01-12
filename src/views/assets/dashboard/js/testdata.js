
      // --- Demo data (replace with API later) ---
      let members = [
        {
          id: crypto.randomUUID(),
          firstName: "Sbu",
          lastName: "Msimango",
          email: "sbu@example.com",
          phone: "+27 71 234 5678",
          tier: "Gold",
          joinDate: "2026-01-05",
        },
        {
          id: crypto.randomUUID(),
          firstName: "Lerato",
          lastName: "Nkosi",
          email: "lerato@example.com",
          phone: "+27 82 555 1122",
          tier: "Platinum",
          joinDate: "2026-01-08",
        },
        {
          id: crypto.randomUUID(),
          firstName: "Jane",
          lastName: "Jazz",
          email: "jane@example.com",
          phone: "+27 82 555 1122",
          tier: "Bronze",
          joinDate: "2026-01-08",
        },
        {
          id: crypto.randomUUID(),
          firstName: "Harry",
          lastName: "Smith",
          email: "harry@example.com",
          phone: "+27 82 555 1122",
          tier: "Platinum",
          joinDate: "2026-01-08",
        },
      ];

      // --- Helpers ---
      const tbody = document.getElementById("membersTbody");
      const emptyState = document.getElementById("emptyState");
      const searchInput = document.getElementById("searchInput");
      const tierFilter = document.getElementById("tierFilter");

      function escapeHtml(str) {
        return String(str).replace(/[&<>"']/g, (m) => ({
          "&": "&amp;",
          "<": "&lt;",
          ">": "&gt;",
          '"': "&quot;",
          "'": "&#039;",
        }[m]));
      }

      function renderStats(list) {
        const total = list.length;
        const gold = list.filter(m => m.tier === "Gold").length;
        const platinum = list.filter(m => m.tier === "Platinum").length;
        const bronze = list.filter(m => m.tier === "Bronze").length;

        document.getElementById("statTotal").textContent = total;
        document.getElementById("statGold").textContent = gold;
        document.getElementById("statPlatinum").textContent = platinum;
        document.getElementById("statBronze").textContent = bronze;
      }

      function getFilteredMembers() {
        const q = searchInput.value.trim().toLowerCase();
        const tier = tierFilter.value;

        return members.filter(m => {
          const haystack = `${m.firstName} ${m.lastName} ${m.email} ${m.phone} ${m.tier}`.toLowerCase();
          const matchSearch = q === "" ? true : haystack.includes(q);
          const matchTier = tier === "" ? true : m.tier === tier;
          return matchSearch && matchTier;
        });
      }

      function renderTable() {
        const list = getFilteredMembers();
        renderStats(members);

        tbody.innerHTML = list.map(m => `
          <tr>
            <td>
              <div class="fw-semibold text-white">${escapeHtml(m.firstName)} ${escapeHtml(m.lastName)}</div>
              <div class="small-note">ID: ${escapeHtml(m.id.slice(0, 8))}...</div>
            </td>
            <td>${escapeHtml(m.email)}</td>
            <td>${escapeHtml(m.phone)}</td>
            <td>
              <span class="badge rounded-pill bg-${m.tier === "Gold" ? "warning" : m.tier === "Platinum" ? "info" : "secondary"} text-dark">
                ${escapeHtml(m.tier)}
              </span>
            </td>
            <td>${escapeHtml(m.joinDate)}</td>
            <td class="text-end">
              <button class="btn btn-sm btn-outline-light" onclick="editMember('${m.id}')">Edit</button>
              <button class="btn btn-sm btn-outline-danger ms-1" onclick="deleteMember('${m.id}')">Delete</button>
            </td>
          </tr>
        `).join("");

        emptyState.style.display = members.length === 0 ? "block" : "none";
      }

      // --- Actions ---
      window.deleteMember = (id) => {
        members = members.filter(m => m.id !== id);
        renderTable();
      };

      window.editMember = (id) => {
        // Simple edit for demo: prompt-based
        const m = members.find(x => x.id === id);
        if (!m) return;

        const newTier = prompt("Update tier (Bronze / Gold / Platinum):", m.tier);
        if (!newTier) return;

        const allowed = ["Bronze", "Gold", "Platinum"];
        if (!allowed.includes(newTier)) {
          alert("Invalid tier.");
          return;
        }
        m.tier = newTier;
        renderTable();
      };

      // --- Add Member Modal Form ---
      const addMemberForm = document.getElementById("addMemberForm");
      addMemberForm.addEventListener("submit", (e) => {
        e.preventDefault();
        e.stopPropagation();

        if (!addMemberForm.checkValidity()) {
          addMemberForm.classList.add("was-validated");
          return;
        }

        const member = {
          id: crypto.randomUUID(),
          firstName: document.getElementById("firstName").value.trim(),
          lastName: document.getElementById("lastName").value.trim(),
          email: document.getElementById("email").value.trim(),
          phone: document.getElementById("phone").value.trim(),
          tier: document.getElementById("tier").value,
          joinDate: document.getElementById("joinDate").value,
        };

        members.unshift(member);
        addMemberForm.reset();
        addMemberForm.classList.remove("was-validated");

        // close modal
        const modalEl = document.getElementById("addMemberModal");
        const modal = bootstrap.Modal.getInstance(modalEl);
        modal.hide();

        renderTable();
      });

      // filters
      searchInput.addEventListener("input", renderTable);
      tierFilter.addEventListener("change", renderTable);

      document.getElementById("year").textContent = new Date().getFullYear();
      renderTable();