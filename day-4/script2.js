fetch('input.txt')
  .then(response => response.text())
  .then(data => {
    const assignments = data.trim().split('\n').map(line => {
      const [elf1, elf2] = line.split(',').map(range => {
        const [start, end] = range.split('-').map(Number);
        return { start, end };
      });
      return { elf1, elf2 };
    });

    let overlaps = 0;
    for (let i = 0; i < assignments.length; i++) {
      const { elf1, elf2 } = assignments[i];
      if (overlapsWith(elf1, elf2)) {
        overlaps++;
      } else if (overlapsWith(elf2, elf1)) {
        overlaps++;
      }
    }

    console.log(`There are ${overlaps} pairs of assignments where the ranges overlap.`);
  });

function overlapsWith(range1, range2) {
  return range1.start <= range2.end && range2.start <= range1.end;
}
